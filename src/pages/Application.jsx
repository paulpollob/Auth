import { GoogleGenerativeAI } from '@google/generative-ai';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Card,
    Checkbox,
    Typography,
} from '@material-tailwind/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { app } from '../Auth/Auth';
import { UserContext } from '../context/Context';

const Application = () => {
    const { user, applications } = useContext(UserContext)
    const [msg, setMsg] = useState([]);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ] 
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
    const [providedText, setProvidedText] = useState("")
    const [formData, setFormData] = useState({
        to: "",
        subject: "",
        body: ""
    })
    const db = getFirestore(app);


    const providedOnChange = (e) => {
        setProvidedText(e.target.value)
        console.log("HK user11: ", user)
    }
    const formInputOnChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        console.log("HK: ", name, value)
    }
    const generateButtonAction = async () => {
        // const prompt = `My name is Prokash. My background is computer science and engineering. The application subject is: '${title}' and the provided text is: '${body}'. Generate a formal application for me in JSON format with attributes like 'subject', 'body', 'to', 'from'. Only return JSON data without any explanations.`;
        const prompt = `My name is Prokash. My background is computer science and engineering. about the application the provided text is: '${providedText}'. Generate a formal application for me in JSON format with attributes like 'subject', 'body', 'to', 'from'. Only return JSON data without any explanations.`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = await response.text();
        text = text.replace(/^```json\s*/, "").replace(/\s*```$/, "").replace(/```/, "").trim();;
        console.log(text)
        const ob = await JSON.parse(text)
        console.log(ob);
        console.log(ob.subject);
        setFormData(ob)
        setOpen(!open);
    }


    return (
        <div className='flex'>
            Hare Krishna from applications

            <div>
                <h1>Applications</h1>
                {
                    applications.map(d=>
                        <ApplicationMenu key={d.uid} data={d}></ApplicationMenu>
                    )
                }
            </div>
            <div>
                <Select className='text-black' options={options} />
                <Button onClick={() => setOpen(true)} variant="gradient">
                    Generate Application
                </Button>
                <Dialog open={open} handler={() => setOpen(!open)}>
                    <DialogHeader className='text-black'>Generate Application</DialogHeader>
                    <DialogBody className='text-black'>
                        <Textarea placeholder="" label="write something" value={providedText} onChange={providedOnChange} />
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={() => setOpen(false)}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" onClick={generateButtonAction}>
                            <span>Generate</span>
                        </Button>
                    </DialogFooter>
                </Dialog>



                <Card color="transparent" className='flex flex-col justify-center items-center' shadow={false}>
                    <Typography color="gray" className="mt-1 font-normal">
                        Your Generated Application is here...
                    </Typography>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-1 flex flex-col gap-6">
                            <Input
                                size="lg"
                                label="To"
                                name='to'
                                onChange={formInputOnChange}
                                value={formData.to}
                            />
                            <Input
                                size="lg"
                                label="Subject"
                                className=" "
                                name='subject'
                                onChange={formInputOnChange}
                                value={formData.subject}
                            />
                            <Textarea
                                placeholder=""
                                label="Body"
                                name='body'
                                onChange={formInputOnChange}
                                value={formData.body}

                            />
                        </div>
                        <Button className="mt-6" fullWidth>
                            Send
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );

}


const ApplicationMenu = (d) => {
    return (
        <div>
            hare Krishna
            {
                d.subject
            }
        </div>
    )
}

export default Application;