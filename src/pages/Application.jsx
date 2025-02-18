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
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select'
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from '../Auth/Auth';
import { UserContext } from '../context/Context';
import { Container, Button as Buttonr, Link as Linkr } from 'react-floating-action-button'

const Application = () => {
    const { user, applications, userOptions, db, sccMsg, errMsg, userInfo } = useContext(UserContext)
    const [msg, setMsg] = useState([]);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
    const [providedText, setProvidedText] = useState("")
    const [formData, setFormData] = useState({
        to: "",
        toName: "",
        subject: "",
        body: ""
    })



    const providedOnChange = (e) => {
        setProvidedText(e.target.value)
    }
    const formInputOnChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
    const generateButtonAction = async () => {
        // const prompt = `My name is Prokash. My background is computer science and engineering. The application subject is: '${title}' and the provided text is: '${body}'. Generate a formal application for me in JSON format with attributes like 'subject', 'body', 'to', 'from'. Only return JSON data without any explanations.`;
        const prompt = `My name is ${userInfo.name}. My background is computer science and engineering. about the application the provided text is: '${providedText}'. Generate a formal application for me in JSON format with attributes like 'subject', 'body', 'to', 'from'. Only return JSON data without any explanations.`;
        const genAI = new GoogleGenerativeAI("AIzaSyA_nby_S6KHpNptXTcpgcSc3ZDGiOPP944");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = await response.text();
        text = text.replace(/^```json\s*/, "").replace(/\s*```$/, "").replace(/```/, "").trim();
        const ob = await JSON.parse(text)
        setFormData(ob)
        setOpen(!open);
    }
    const applicationItemClick = (id) => {
        const filtered = applications.find(d => d.docId === id)
        console.log("filtered: ", filtered)
        setFormData(filtered)
    }
    const sendAction = async () => {
        console.log("formData: db", db)
        try {
            setFormData({ ...formData, ['approved']: 0, ['update']: false })
            console.log("formData: ", formData)
            const res = await setDoc(doc(db, "applications", formData.docId), formData);
            sccMsg("Successfull!!!")
            console.log(res)
        }
        catch (error) {
            console.error("Error updating document: ", error);
        }
    }
    const applicationAction = async (docId, action) => {
        try {
            await setDoc(doc(db, "applications", docId), { approved: action }, { merge: true });
            sccMsg("Successfull!!!")
            console.log("Document updated successfully!");
        } catch (error) {
            errMsg("Error updating document: ")
            console.error("Error updating document: ", error);
        }
    }
    const manualApplication = () =>{
        setFormData({
            to: "",
            toName: "",
            subject: "",
            body: ""
        })
    }


    return (
        <div className='flex justify-around'>
            <div>
                <h5 className='mb-4 text-2xl text-slate-400'>Applications</h5>
                <div className='flex flex-col gap-2'>
                    {
                        applications.map((data, index) =>
                            <ApplicationMenu key={index} action={() => applicationItemClick(data.docId)} data={data}></ApplicationMenu>
                        )
                    }
                </div>
            </div>
            <div className=' text-slate-300'> 
                <Button onClick={() => setOpen(true)} variant="gradient">
                    Generate Application
                </Button>
                <Button onClick={() => manualApplication()} variant="gradient">
                    Manual Application
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
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 text-slate-300">
                        <div className="mb-1 flex flex-col gap-6"> 
                            <Select options={userOptions}
                                className="  w-full h-full text-black"
                                name="toName"
                                onChange={(newValue) => setFormData({ ...formData, ['toEmail']: newValue.label, ['toId']: newValue.value, ['docId']: user.uid + newValue.value+Date.now(), ['toName']: newValue.name })
                                } 
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
                        {(formData?.approved == 2) && <p>Accepted by {formData.toName}</p>}
                        {(formData?.approved == 1) && <p>Rejected by {formData.toName}</p>}
                        {
                            (!formData?.toId?.includes(user.uid)) ?
                                (formData?.approved == null) &&
                                    <Button onClick={() => sendAction()} className="mt-6" fullWidth>
                                        Send
                                    </Button> 
                                :
                                <div className='flex gap-2'>
                                    <Button onClick={() => applicationAction(formData.docId, 2)} style={{ backgroundColor: "green" }} className="mt-6 bg-teal-500 " fullWidth>
                                        Accept
                                    </Button>
                                    <Button onClick={() => applicationAction(formData.docId, 1)} style={{ backgroundColor: "red" }} className="mt-6" fullWidth>
                                        Deny
                                    </Button>
                                </div>
                        }
                    </form>
                </Card>
            </div>

        </div>
    );

}


const ApplicationMenu = ({ data, action }) => {
    return (
        <div onClick={() => action()} className='border rounded-lg px-4 py-2 text-left text-slate-500 '>
            {
                `${data.subject} `
            }
        </div>
    )
}


const YourAwesomeComponent = () => {
    return (
        <Container>
            <Linkr href="#"
                tooltip="Create note link"
                icon="far fa-sticky-note" />
            <Linkr href="#"
                tooltip="Add user link"
                icon="fas fa-user-plus" />
            {/* className="fab-item btn btn-link btn-lg text-white" */}
            <Buttonr
                tooltip="The big plus button!"
                icon="fas fa-plus"
                rotate={true} />
        </Container>
    )
}

export default Application;