import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='flex '>
            Hare Krishna from Header
            <Link to={'/home/application'}>application</Link>
            <Link to={'/home/message'}>message</Link>
        </div>
    );
};

export default Header;