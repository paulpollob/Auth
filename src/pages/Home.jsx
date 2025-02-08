import React, { useContext } from 'react';
import { UserContext } from '../context/Context';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Home = () => {
    const { user, setUser, logOut } = useContext(UserContext);
    console.log("HK user: ", user)
    return (
        <div className='bg-slate-900 w-full h-full'>
            Hare Krishna from home
           <Outlet></Outlet>
           <button onClick={()=>logOut()}>SignOut</button>
           <Header></Header>
        </div>
    );
};

export default Home;