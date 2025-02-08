import React, { useContext } from 'react';
import Context, { UserContext } from '../context/Context';
import LogIn from '../pages/LogIn'
import { Navigate, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const PrivateRoute = ({ children }) => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div>
            {
                user === "notLoadedYet" ? <Loading /> : 
                user?.uid!=null?children:
                <Navigate to="/login" replace />
            }
        </div>
    )
    if (user === "notLoadedYet") return <Loading></Loading>
    if (user?.uid != null) return children
    return

};

export default PrivateRoute;