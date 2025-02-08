import React, { createContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from '../Auth/Auth';
import { toast } from 'react-toastify';


const auth = getAuth(app);



export const UserContext = createContext();




const Context = ({ children }) => {
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                setUser(user)
                return <Navigate to="/home" replace />;
                // ...
            } else {
                // alert("no user")
                setUser("no user")

                // User is signed out
                // ...
            }
        });
        return () => unsubscribe();
    }, [])


    const register = (email, password) => createUserWithEmailAndPassword(auth, email, password)
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
    const logOut = () => {
        signOut(auth)
    }
    const infoMsg = (msg) => toast.info(msg)
    const warnMsg = (msg) => toast.warning(msg)
    const errMsg = (msg) => toast.error(msg)
    const sccMsg = (msg) => toast.success(msg)


 
    const [user, setUser] = useState("notLoadedYet"); 

    const value = { user, setUser, login, register, logOut, infoMsg, warnMsg, errMsg, sccMsg }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default Context;
