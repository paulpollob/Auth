import React from 'react';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCxfsEXSchAQ_JCUJVGb0QuRB5JHBJYxF8",
    authDomain: "educonnect-2024.firebaseapp.com",
    databaseURL: "https://educonnect-2024-default-rtdb.firebaseio.com",
    projectId: "educonnect-2024",
    storageBucket: "educonnect-2024.firebasestorage.app",
    messagingSenderId: "97049265135",
    appId: "1:97049265135:web:a09dc6a0899d4f53316c1a"
  };

export const app = initializeApp(firebaseConfig);

const Auth = () => {
    return (
        <div>
            
        </div>
    );
};

export default Auth;