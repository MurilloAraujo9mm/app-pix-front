import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Snackbar, Alert, CssBaseline, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Outlet, useNavigate } from 'react-router-dom';
import { api } from '../../../../../api/api';

const Login: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const data = await api.login(email, password);
            const { token } = data.token;
            
            if (data.error) {
                setErrorMessage(data.error);
                setOpen(true);
            } else {
                localStorage.setItem('token', token);
                navigate('/dashboard/transaction');
            }
        } catch (error) {
            setErrorMessage(String(error));
            setOpen(true);
        }
    };

    const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '8vh'
            }}>
                <Avatar style={{ margin: 8, backgroundColor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <TextField
                    label="E-mail"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    required
                    autoFocus
                    InputProps={{ startAdornment: <LockOutlinedIcon fontSize="small" /> }}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    required
                    InputProps={{ startAdornment: <LockOutlinedIcon fontSize="small" /> }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ margin: '24px 0' }}
                    onClick={handleSubmit}
                >
                    Login
                </Button>
            </div>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Login;
