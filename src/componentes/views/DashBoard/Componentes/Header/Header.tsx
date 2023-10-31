import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header: React.FC = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
    };
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Laravel - pix
                </Typography>

                {token ? (
                    <>
                        <Button color="inherit" component={Link} to="/dashboard">
                            Dashboard
                        </Button>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
