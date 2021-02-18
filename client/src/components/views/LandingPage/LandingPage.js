import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage(props) {

    useEffect(() =>{
        axios.get('/api/hello').then(r => console.log(r.data))
    }, []);

    const onClickHandler = () => {
        axios.get('/api/users/logout')
            .then(response => {
                if (response.data.success) {
                    props.history.push('/login');
                } else {
                    alert('failed logout');
                }
            });
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', flexDirection: 'column'
        }}>
            <h2>LandingPage</h2>

            <button onClick={onClickHandler}>
                Logout
            </button>
        </div>
    )
}

export default LandingPage;