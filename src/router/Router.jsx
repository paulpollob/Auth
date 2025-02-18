import React from 'react'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App'
import Home from '../pages/Home'
import LogIn from '../pages/LogIn'
import Registration from '../pages/Registration'
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Application from '../pages/Application';
import Message from '../pages/Message';
import Main from '../pages/Main';

const Router = createBrowserRouter([ 
    { path: '/', element: <PrivateRoute><Main></Main></PrivateRoute>,
        children: [
            {path: "/", element: <Home></Home>},
            {path: "/home", element: <Home></Home>},
            {path: "/home/application", element: <Application></Application>},
            {path: "/home/message", element: <Message></Message>}
        ]
    },
    { path: "/login", element: <LogIn></LogIn> },
    { path: "/register", element: <Registration></Registration> },
    { path: "*", element: <h1>Hare Krishna 404 not found</h1> }
 
    
    ]);

export default Router;
