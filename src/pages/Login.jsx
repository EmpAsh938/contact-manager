import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email !== '' && password !== '') {
            // do login

            let id = new Date().getTime();

            // save user id and other information
            localStorage.setItem("user", JSON.stringify({ id, email, password }))

            setEmail('');
            setPassword('');

            toast.success('Login Successful')

            // navigate
            navigate('/home');
        }
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
