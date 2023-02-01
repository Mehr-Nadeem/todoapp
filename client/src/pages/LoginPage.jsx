import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import loginRequest from "../api/loginRequest.js";
import {TokenContext} from "../App.jsx";

export const LoginPage = () => {
    const [token, setToken] = useContext(TokenContext)
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        loginRequest(password)
            .then(({token}) => {
                setToken(token);
                navigate('/');
        }).catch(err => {
            setError(err.message);
        });
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div style={{color: 'red'}}>{error}</div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>Login</button>
            </form>
        </div>
    );
};