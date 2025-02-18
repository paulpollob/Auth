import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Header></Header>
            <div className='px-28'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;