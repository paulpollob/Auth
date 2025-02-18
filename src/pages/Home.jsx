import React, { useContext } from 'react';
import { UserContext } from '../context/Context';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import straightShape from "../assets/straightShape.png";
import Clipar from "../assets/Clipar.png";
import HeadChip from "../assets/HeadWithAiChip.jpg";

const Home = () => {
    const { user, setUser, logOut } = useContext(UserContext);
    // const styles = {
    //     backgroundImage: `url(${straightShape})`, 
    //     backgroundPosition: "center",
    //     height: "100vh",
    //     width: "100%",
    // };
    return (
        <div className='  flex flex-col items-start justify-start w-full h-full'>
            {/* <button onClick={()=>logOut()}>SignOut</button> */}
            {/* <Header></Header> */}
            {/* <Outlet></Outlet> */}
            <div className=' h-10 flex gap-2'>
                <img className='h-96 w-96' src={HeadChip}></img>
                <div className=''> 
                    <h1>Hey <span className='bg-slate-500 rounded-2xl px-2 font-bold'>There</span></h1>
                    <div className='w-2 h-full bg-amber-300'></div>
                    <h2 className='text-2xl font-serif font-bold text-start'>HERE Easily Generate and Send Applications to Your Teacher!</h2>
                    <small className='text-start'>Writing applications can be time-consuming. Our platform lets students quickly generate well-structured applications for various needs—leave requests, permissions, or any formal communication. Just enter your details, and get a polished application ready to send!</small>
                    <br></br>
                    <p className='text-end font-serif text-3xl font-bold m-5 text-yellow-400 p-6 italic border rounded-3xl '>Just Go To Application Tab</p>
                </div>
                <img className='absolute top-0 -z-10  rounded-2xl opacity-40' src={Clipar} />
            </div>
        </div>
    );
};

export default Home;