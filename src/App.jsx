// File: App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [data, setData] = useState('');
    const [jwt, setJwt] = useState(localStorage.getItem('jwt') || '');

    const register = async () => {
        try {
            const res = await axios.post('https://jwt-auth-file-handling.vercel.app/register', { username, password });
            setMessage(res.data);
        } catch (err) {
            setMessage(err.response.data);
        }
    };

    const login = async () => {
        try {
            const res = await axios.post('https://jwt-auth-file-handling.vercel.app/login', { username, password });
            localStorage.setItem('jwt', res.data.token);
            setJwt(res.data.token);
            setMessage('Login successful');
        } catch (err) {
            setMessage(err.response.data);
        }
    };

    const saveData = async () => {
        try {
            const res = await axios.post(
                'https://jwt-auth-file-handling.vercel.app/save',
                { data: { key: 'value' } },
                { headers: { Authorization: jwt } }
            );
            setMessage(res.data);
        } catch (err) {
            setMessage(err.response.data);
        }
    };

    const readData = async () => {
        try {
            const res = await axios.get('https://jwt-auth-file-handling.vercel.app/read', { headers: { Authorization: jwt } });
            setData(JSON.stringify(res.data));
        } catch (err) {
            setMessage(err.response.data);
        }
    };

    return (
        <div>
            <h1>JWT Auth App</h1>
            <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={register}>Register</button>
            <button onClick={login}>Login</button>
            <button onClick={saveData} disabled={!jwt}>Save Data</button>
            <button onClick={readData} disabled={!jwt}>Read Data</button>
            <p>{message}</p>
            <pre>{data}</pre>
        </div>
    );
}

export default App;
