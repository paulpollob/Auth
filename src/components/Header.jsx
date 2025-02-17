import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='flex '>
            This is Header
            <Link to={'/home/application'}>application</Link>
            <Link to={'/home/message'}>message</Link>
        </div>
    );
};

export default Header;