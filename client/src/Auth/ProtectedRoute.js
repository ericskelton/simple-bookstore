import React, {useContext, } from 'react';
import { AuthContext } from './AuthContext';
import {Navigate, useLocation, Outlet} from 'react-router-dom';


export const ProtectedRoute = (props) => {
    const [auth] = useContext(AuthContext);
    const location = useLocation();

    if (auth.loggedIn) {
        return <Outlet/>;
    } 
    return <Navigate 
                to={`/login/${location.search}`} 
                replace
                state = {{location}}
            />;
    
}