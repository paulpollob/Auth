import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/Context';
import sample from "../assets/sample.jpg";
import Loading from '../components/Loading';
// import { FloatingLabel } from 'flowbite-react';
import Field from '../components/Field';
import { doc, setDoc } from 'firebase/firestore';

const Registration = () => {

    const styles = {
        backgroundImage: `url(${sample})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
    };

    const { user, setUser, register, errMsg, sccMsg, db } = useContext(UserContext);

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        address: "",
        dept: "",
        userType: "",
    });


    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid.";
        }
        if (!formData.password.trim()) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required.";
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be 10 digits.";
        }
        if (!formData.address.trim()) newErrors.address = "Address is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            console.log("Registration Successful", formData);

            register(formData.email, formData.password)
                .then(async(userCredential) => {
                    const user = userCredential.user;
                    
                    await setFormData({ ...formData, ['uid']: user.uid })
                    const newFform = { ...formData, ['uid']: user.uid }
                    const res = await setDoc(doc(db, "users", user.uid), newFform);

                    console.log("HK:response ")
                    console.log(res)
                    // await setFormData({ ...formData, ['uid']: user.uid })
                    console.log("HK user: ", user)
                    sccMsg("successfull!!!")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("HK error register: ", errorMessage)
                    errMsg(errorMessage)
                    // ..
                });
        }
    };

    return (
        <>
            {
                user === "notLoadedYet" ? <Loading /> :
                    user?.uid != null ? <Navigate to="/home" replace /> :
                        <div style={styles} className="flex flex-col items-center justify-center">
                            <div className="registration-container bg-slate-100 p-20 rounded-xl text-black">
                                <h2 className="">Register</h2>
                                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                                    <Field errors={errors} lblStr={"name"} type={'text'} value={formData.name} handleChange={handleChange}></Field>
                                    <Field errors={errors} lblStr={"email"} type={'email'} value={formData.email} handleChange={handleChange}></Field>
                                    <Field errors={errors} lblStr={"password"} type={'password'} value={formData.password} handleChange={handleChange}></Field>
                                    <Field errors={errors} lblStr={"confirmPassword"} type={'password'} value={formData.confirmPassword} handleChange={handleChange}></Field>
                                    <Field errors={errors} lblStr={"phoneNumber"} type={'text'} value={formData.phoneNumber} handleChange={handleChange}></Field>
                                    <Field errors={errors} lblStr={"dept"} type={'text'} value={formData.dept} handleChange={handleChange}></Field>
                                    <Field errors={errors} lblStr={"userType"} type={'text'} value={formData.userType} handleChange={handleChange}></Field>
                                    <div>
                                        <label htmlFor="address">Address:</label>
                                        <textarea
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.address && <small className="error">{errors.address}</small>}
                                    </div>
                                    <button className='text-slate-100' type="submit">Register</button>
                                </form>

                                <p className="footer-text">
                                    Already have an account? <Link to="/login">Login here</Link>
                                </p>
                            </div>
                        </div>
            }
        </>
    );
};



export default Registration;