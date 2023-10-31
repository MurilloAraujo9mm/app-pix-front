import axios from 'axios';

const BASE_URL = 'http://localhost:80/api/v1';

type AxiosError = {
    response?: {
        data: {
            message: string;
        };
        status: number;
        headers: any;
    };
    request?: any;
    message: string;
};


export const api = {
    login: async (email: string, password: string) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, { email, password });
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;

            if (axiosError.response) {
                throw new Error(axiosError.response.data.message || 'Erro ao realizar o login.');
            } else if (axiosError.request) {
                throw new Error('Erro ao conectar com o servidor. Não houve resposta.');
            } else {
                throw new Error('Erro ao conectar com o servidor.');
            }
        }
    },
    createTransaction: async (data: { amount: number, pix_key: string, description: string }) => {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Token not found");
        }

        try {
            const response = await axios.post(`${BASE_URL}/transaction/create`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;

            if (axiosError.response) {
                throw new Error(axiosError.response.data.message || 'Erro ao realizar o login.');
            } else if (axiosError.request) {
                throw new Error('Erro ao conectar com o servidor. Não houve resposta.');
            } else {
                throw new Error('Erro ao conectar com o servidor.');
            }
        }
    },

    getTransactions: async (page = 1) => {

        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/transaction/list?page=${page}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch transactions.");
        }

        const data = await response.json();
        return data;
    },
    
    getUserDetails: async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/user/details`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user details.");
        }

        const data = await response.json();
        return data;
    }

};
