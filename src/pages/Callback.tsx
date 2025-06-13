import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthService } from '../service/auth';

const Callback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleSpotifyCallback = async (code: string,state:string) => {
        try {

            const apiUrl= process.env.REACT_APP_API_URL;

            // Criando query params
            const queryParams = new URLSearchParams({
                code: code,
                state: state
            }).toString();

            const response = await fetch(`${apiUrl}/api/auth/callback?${queryParams}`, {
                method: 'GET'
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Resposta do servidor:', errorData);
                throw new Error('Falha na autenticação');
            }

            const data = await response.json();

            // Armazena o token de acesso
            localStorage.setItem('access_token', data.access_token);

            AuthService.setToken(data.access_token);

           // Redireciona para a página principal após o login
            navigate('/dashboard');
        } catch (error) {
            console.error('Erro durante autenticação:', error);
            navigate('/login');
        }
    };

    useEffect(() => {
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        if (!code || !state) { // Validar ambos os parâmetros
            console.error('Parâmetros de autenticação ausentes');
            navigate('/login');
            return;
        }

       handleSpotifyCallback(code,state);


    }, [searchParams, navigate, handleSpotifyCallback]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Autenticando...</h2>
                <p>Por favor, aguarde enquanto processamos seu login.</p>
            </div>
        </div>
    );
};

export default Callback;
