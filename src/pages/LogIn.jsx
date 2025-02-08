import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Context, { UserContext } from '../context/Context';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Home from './Home';
import sample from "../assets/sample.jpg";
import { Bounce, toast, ToastContainer } from 'react-toastify';
import Field from '../components/Field';

const LogIn = () => {


    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { user, setUser, login, errMsg, sccMsg } = useContext(UserContext);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        address: "",
    });

    const styles = {
        backgroundImage: `url(${sample})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const onSubmit = (data) => {
        console.log('Form Submitted:', data);
        // login("paul@paul.com", "Abcdef@5")
        login(data?.email, data?.password)
            .then((userCredential) => {
                const user = userCredential.user;
                sccMsg("successfull login")
                setUser(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                errMsg(errorMessage)
            });
    };

    return (
        <>
            {
                user === "notLoadedYet" ? <Loading /> :
                    user?.uid != null ? <Navigate to="/home" replace /> :
                        <div style={styles} className="login-container w-full h-full flex flex-col items-center justify-center text-black ">
                            <div className='flex flex-col items-center justify-center bg-slate-100 p-20 rounded-xl bg-opacity-0'>
                                <h2>Login</h2>
                                <form onSubmit={handleSubmit(onSubmit)} className="login-form ">

                                    <Field type={'email'} lblStr={'email'} handleChange={handleChange} value={formData?.email}></Field>
                                    <div className="input-container">
                                        <label htmlFor="email" className='w-1/4'>Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                    message: 'Please enter a valid email'
                                                }
                                            })}
                                            placeholder="Enter your email"
                                        />
                                        {errors.email && <p className="error">{errors.email.message}</p>}
                                    </div>

                                    {/* Password Input */}
                                    <div className="input-container">
                                        <label htmlFor="password" className='w-1/4'>Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            {...register('password', {
                                                required: 'Password is required',
                                                minLength: {
                                                    value: 6,
                                                    message: 'Password should be at least 6 characters'
                                                }
                                            })}
                                            placeholder="Enter your password"
                                        />
                                        {errors.password && <p className="error">{errors.password.message}</p>}
                                    </div>

                                    {/* Submit Button */}
                                    <button type="submit" className="submit-button text-slate-100">
                                        Login
                                    </button>
                                </form>

                                <p className="footer-text">
                                    Don't have an account? <Link to="/register">Register here</Link>
                                </p>
                            </div>
                        </div>
            }
        </>
    );
};

export default LogIn;