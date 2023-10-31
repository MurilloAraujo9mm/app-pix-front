import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Paper,
    Grid,
    Avatar,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { api } from '../../../../../api/api';

function MyAccount() {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | any>(null);

    useEffect(() => {
        async function fetchUserDetails() {
            try {
                const response = await api.getUserDetails();
                setData(response);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        }
        fetchUserDetails();
    }, []);

    if (loading) return <Typography variant="h4">Loading...</Typography>;
    if (error) return <Typography variant="h4">Error: {error}</Typography>;
    if (!data) return null; 

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} style={{ padding: '32px', marginTop: '32px' }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={4} lg={3}>
                        <Avatar style={{ width: 100, height: 100 }}>
                            <AccountCircleIcon fontSize="inherit" />
                        </Avatar>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <Typography variant="h3">{data.account.name}</Typography>
                        <ListItem disableGutters dense>
                            <ListItemIcon>
                                <EmailIcon />
                            </ListItemIcon>
                            <ListItemText primary={data.account.email} />
                        </ListItem>
                        <ListItem disableGutters dense>
                            <ListItemIcon>
                                <AttachMoneyIcon />
                            </ListItemIcon>
                            <ListItemText primary={`$${data.user[0].balance}`} />
                        </ListItem>
                        <ListItem disableGutters dense>
                            <ListItemIcon>
                                <VpnKeyIcon />
                            </ListItemIcon>
                            <ListItemText primary={`Chave PIX: ${data.user[0].pix_key}`} />
                        </ListItem>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default MyAccount;
