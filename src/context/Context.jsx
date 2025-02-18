import React, { createContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from '../Auth/Auth';
import { toast } from 'react-toastify';
import { collection, getDocs, getFirestore } from 'firebase/firestore';


const auth = getAuth(app);
const db = getFirestore(app) ;
 
export const UserContext = createContext();




const Context = ({ children }) => {
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                setUser(user)
                console.log(user)
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



    useEffect(()=>{
        
        const getUsers = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            let dt = []
            let allusr = []
            querySnapshot.forEach((doc) => {  
                allusr.push(doc.data())
                dt.push({value:doc.data().uid, label:doc.data().email, name:doc.data().name})
            });
            setAllUsers(allusr)
            setUserOptions(dt)
        }
        return () => getUsers(); 
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


    const [userInfo, setUserInfo] = useState({});
    const [userOptions, setUserOptions] = useState([])
    const [allUsers, setAllUsers] = useState([]);
    const [user, setUser] = useState("notLoadedYet");
    const [applications, setApplications] = useState([])

    useEffect(()=>{

        if (user && user !== "no user") {
            // Fetch applications when user is available
            const getUsers = async () => {
                const querySnapshot = await getDocs(collection(db, "applications")); 
                let d = [];
                querySnapshot.forEach((doc) => { 
                    if (doc.data().docId?.includes(user.uid)) {
                        d.push(doc.data()); // Push matching docs
                    }
                }); 
                setApplications(d); // Set applications after fetching
            };
            getUsers();
        } 
    }, [user])
    useEffect(()=>{ 
        // allUsers?.forEach(d=>console.log(d)) 
        const userInfo = allUsers?.find(d=>d.uid===user.uid)
        setUserInfo(userInfo); 
    }, [allUsers, user ])


    const value = { user, setUser, login, register, logOut, infoMsg, warnMsg, errMsg, sccMsg, allUsers, applications, userOptions, db, userInfo }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default Context;
