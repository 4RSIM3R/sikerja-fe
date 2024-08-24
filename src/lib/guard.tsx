import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('auth_token');
    if (!token)  return <Navigate to="/login" />;
    return children;
};

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('auth_token');
    if (token) return <Navigate to="/backoffice" />;
    return children;
};
