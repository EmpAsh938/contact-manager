import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../constants';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email && !password) {
            return toast.error('Some fields are empty')
        }

        axios.post(BASE_URL + "/api/v1/users/login", { email, password })
            .then(response => {
                // save user id and other information
                localStorage.setItem("user", JSON.stringify({ id: response.data.id, email, password }))

                setEmail('');
                setPassword('');

                toast.success('Login Successful')

                // navigate
                navigate('/home');
            }).catch(error => {
                toast.error(error)
                console.log(error)
            })

    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
                <p className="auth_nav">
                    <span>New user, Don't have an account</span>
                    <Link to={"/register"}>Register</Link>
                </p>
            </form>

        </div>
    );
}
