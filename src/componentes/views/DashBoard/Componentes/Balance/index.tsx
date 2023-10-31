import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    Divider,
    IconButton,
    Tooltip,
} from '@mui/material';
import {  AttachMoney, ArrowBackIos, ArrowForwardIos, Send, AbcRounded,  } from '@mui/icons-material';
import { api } from '../../../../../api/api';

const TransactionsList: React.FC = () => {
    const [transactionsData, setTransactionsData] = useState({
        transactions: [],
        currentPage: 1,
        lastPage: 1,
        perPage: 15,
    });

    const fetchData = async (page: number) => {
        try {
            const data = await api.getTransactions(page);
            if (data) {
                setTransactionsData({
                    transactions: data.data,
                    currentPage: data.current_page,
                    lastPage: data.last_page,
                    perPage: data.per_page,
                });
            }
           
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    useEffect(() => {
        fetchData(transactionsData.currentPage);
    }, [transactionsData.currentPage]);

    return (
        <Paper elevation={3} style={{ margin: '2rem', padding: '1rem', height: '80vh', overflowY: 'scroll', width: "1000px" }}>
            <Typography variant="h5" gutterBottom>
                Transações
            </Typography>
            <Divider />
            {transactionsData.transactions.map((transaction: any, index: number) => (
                <Box
                    key={index}
                    sx={{
                        marginY: 2,
                        padding: 2,
                        borderRadius: 4,
                        bgcolor: "#f5f5f5",
                        boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.1)",
                        transition: "box-shadow 0.3s",
                        '&:hover': {
                            boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.15)'
                        }
                    }}
                >

                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" flexDirection="column" alignItems="start">
                            <Tooltip title="Remetente" placement="top">
                                <Send color="primary" style={{ marginRight: '8px' }} />
                            </Tooltip>
                            <Typography variant="h6">Remetente:</Typography>
                            <Typography variant="body1">{transaction.sender.name}</Typography>
                            <Typography variant="body2">{transaction.sender.email}</Typography>
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="end">
                            <Tooltip title="Destinatário" placement="top">
                                <AbcRounded color="secondary" style={{ marginLeft: '8px' }} />
                            </Tooltip>
                            <Typography variant="h6">Destinatário:</Typography>
                            <Typography variant="body1">{transaction.recipient.name}</Typography>
                            <Typography variant="body2">{transaction.recipient.email}</Typography>
                            <Typography variant="h6">Valor recebido:</Typography>

                            <Typography variant="body2">{transaction.amount}</Typography>
                        </Box>
                    </Box>
                   
                </Box>
            ))}
            <Box display="flex" justifyContent="center" marginTop={2}>
                <IconButton
                    disabled={transactionsData.currentPage === 1}
                    onClick={() => setTransactionsData((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                >
                    <ArrowBackIos />
                </IconButton>
                <Typography variant="body1" style={{ margin: '0 1rem' }}>
                    {transactionsData.currentPage} / {transactionsData.lastPage}
                </Typography>
                <IconButton
                    disabled={transactionsData.currentPage === transactionsData.lastPage}
                    onClick={() => setTransactionsData((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                >
                    <ArrowForwardIos />
                </IconButton>
            </Box>
        </Paper>
    );
}

export default TransactionsList;
