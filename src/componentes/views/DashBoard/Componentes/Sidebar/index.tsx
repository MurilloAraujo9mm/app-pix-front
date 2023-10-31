import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Balance } from '@mui/icons-material';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar" style={{ width: '250px', height: '100vh', backgroundColor: '#2E3A59' }}>
            <List style={{ backgroundColor: 'transparent' }}>
                <ListItem button component={Link} to="/dashboard/transaction" style={{ marginBottom: '10px', backgroundColor: '#3C4B64', borderRadius: '8px', color: 'white' }}>
                    <ListItemIcon style={{ color: 'white' }}>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Efetuar transferência" />
                </ListItem>
                <ListItem button component={Link} to="/dashboard/balance/transaction" style={{ marginBottom: '10px', backgroundColor: '#3C4B64', borderRadius: '8px', color: 'white' }}>
                    <ListItemIcon style={{ color: 'white' }}>
                        <Balance />
                    </ListItemIcon>
                    <ListItemText primary="Transferências" />
                </ListItem>
                <ListItem button component={Link} to="/dashboard/balance/my-account" style={{ marginBottom: '10px', backgroundColor: '#3C4B64', borderRadius: '8px', color: 'white' }}>
                    <ListItemIcon style={{ color: 'white' }}>
                        <Balance />
                    </ListItemIcon>
                    <ListItemText primary="Minha conta" />
                </ListItem>
            </List>
        </div>
    );
}

export default Sidebar;
