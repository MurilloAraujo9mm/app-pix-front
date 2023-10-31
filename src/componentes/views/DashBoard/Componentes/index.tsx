import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header/Header';

interface DashboardLayoutProps {
    children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <>
            <Header />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div className="dashboard-content" style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default DashboardLayout;