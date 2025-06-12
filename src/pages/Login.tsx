import React, {useState} from "react";
import logoSpotify from '../assets/logo_spotify.png';
import styles from '../spotify.module.css';


const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const apiUrl = process.env.REACT_APP_API_URL


            const response = await fetch(`${apiUrl}/api/auth/login`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Falha ao obter URL de autenticação');
            }

            const data = await response.json();

            // Redireciona para a URL de autorização do Spotify
            window.location.href = data.authorize_url;

        } catch (error) {
            console.error('Erro durante login:', error);
            setError('Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.frame}>
            <div className={styles.container}>
                <div>
                    <div className={styles.ajustify}>

                        <img src={logoSpotify} alt="Descrição da imagem" style={{width: 164, height: 49.06}}/>

                    </div>
                    <div className={styles.card}>
                        <span className={styles.cardtext}>
                        Entra com sua conta Spotify clicando no botão abaixo
                        </span>
                    </div>

                    <div className={styles.framebutton}>
                        <button className={styles.cardsection}
                                onClick={handleLogin}
                        >
                            <span className={styles.cardtextbutton}>
                            {'Entrar'}
                            </span>
                        </button>
                    </div>

                </div>
            </div>

        </div>

    );
};

export default Login;

