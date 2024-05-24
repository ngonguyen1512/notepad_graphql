import { Outlet, Navigate } from 'react-router-dom'

export default function ProtectedRoot({ children }) {
    if (!localStorage.getItem('accessToken')) {
        return <Navigate to='/login'/>;
    }
    return (
        <Outlet />
    )
}
