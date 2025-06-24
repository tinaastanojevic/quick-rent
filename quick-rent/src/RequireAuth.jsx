import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from './context/AuthContext';

function RequireAuth({ allowedRoles }) {
    // const location = useLocation();
    const { roles, isReady ,isLoggedIn} = useContext(AuthContext);

    if (!isReady) return <div>Loading...</div>;

    const hasAccess = allowedRoles.some(role => roles.includes(role));

    return (
        isLoggedIn ?
        (hasAccess
            ? <Outlet />
            : <Navigate to="/" />
        )
        :
        <Navigate to="/login" />
    )
}

export default RequireAuth