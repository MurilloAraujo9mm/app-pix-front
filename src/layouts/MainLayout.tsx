import React, { ReactNode } from 'react';

interface PageWrapperProps {
    children: ReactNode;
}

const MainLayout: React.FC<PageWrapperProps> = ({ children }) => {
    return (
        <>
            {children}
        </>
    );
}

export default MainLayout;