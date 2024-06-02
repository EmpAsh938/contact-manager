import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BASE_URL } from '../constants';
import axios from 'axios';


export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!name && !email && !password) {
            return toast.error('Some fields are emtpy')
        }


        axios.post(BASE_URL + "/api/v1/users/", { name, email, password, about: 'about' })
            .then(response => {
                // resets
                setName('');
                setEmail('');
                setPassword('');

                toast.success('Registration Successful')

                // navigate
                navigate('/login');
                console.log(response)
            }).catch(error => {
                toast.error(error)
                console.log(error)
            })

    }

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2 className="register-title">Register</h2>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit" className="register-button">Register</button>
                <p className="auth_nav">
                    <span>Already have an account</span>
                    <Link to={"/login"}>Login</Link>
                </p>
            </form>
        </div>
    );
}
