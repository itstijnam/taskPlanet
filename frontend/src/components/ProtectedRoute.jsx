import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children, allowedRoles }) {
    
    const { admin } = useSelector((store) => store.auth);

    if (!admin) {
        return <Navigate to="/login" />;
    }
    if (!allowedRoles.includes(admin.role)) {
        return <Navigate to="/" />;
    }
    return children;
}

export default ProtectedRoute;
