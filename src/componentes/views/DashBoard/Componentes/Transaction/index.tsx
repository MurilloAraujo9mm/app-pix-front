import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Snackbar,
    Paper,
    Grid
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { api } from '../../../../../api/api';
import ReactHowler from 'react-howler';
import mp3 from "./short-success-sound-glockenspiel-treasure-video-game-6346.mp3"

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Transaction: React.FC = () => {

    const [amount, setAmount] = useState('');
    const [pixKey, setPixKey] = useState('');
    const [description, setDescription] = useState('');
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState<any | null>(null);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [playSuccessSound, setPlaySuccessSound] = useState(false);


    const handleSubmit = async () => {
        try {
            if (!amount || !pixKey || !description) {
                setErrorMessage("Por favor, preencha todos os campos.");
                setOpen(true);
                return;
            }

            const data = await api.createTransaction({
                amount: Number(amount),
                pix_key: pixKey,
                description
            });

            console.log(data)
            if (data.message) {
                setSuccessMessage(data);
                setOpenSuccess(true);
                setPlaySuccessSound(true);
            }

        } catch (error) {
            console.log(error);
            setErrorMessage(String(error));
            setOpen(true);
        }
    };


    const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setOpenSuccess(false);
    };

    return (
        <Container component={Paper} maxWidth="sm" elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Efetuar transfência
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        label="Amount"
                        fullWidth
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="PIX Key"
                        fullWidth
                        value={pixKey}
                        onChange={(e) => setPixKey(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        startIcon={<SendIcon />}
                        onClick={handleSubmit}
                    >
                        Send Transaction
                    </Button>
                </Grid>
            </Grid>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <div>
                    <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
                </div>
            </Snackbar>

            <Snackbar
                open={openSuccess}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <div style={{ marginRight: "20px" }} >
                    <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                        {successMessage?.message} 
                    </Alert>
                </div>
            </Snackbar>
            {successMessage &&
                <ReactHowler
                    src={mp3}
                    playing={true}
                />
            }


        </Container>
    );
};

export default Transaction;
