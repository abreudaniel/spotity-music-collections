import React, { useEffect } from 'react';
import styles from '../spotify.module.css';
import Menu from "./Menu";

const Dashboard = () => {

    console.log('Iniciou Dashboard');

    // Armazena o token de acesso
    var token = localStorage.getItem('access_token');

    console.log('Dados recebidos ( token):', {token});
    return (
        <div className={styles.dashboardhead}>
            <div style={{color: '#ffffff', paddingLeft: '920px'}}>
                DASHBOARD
            </div>
            <Menu />
        </div>

    )
}

export default Dashboard;