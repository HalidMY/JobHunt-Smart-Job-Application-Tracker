import { useState } from "react";
import '../style/global.css';
import { Link } from "react-router-dom";

export default function Login(props) {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <form onSubmit={handleSubmit} className="auth-form">
                    <h2 className="auth-title">Login to Your Account</h2>

                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="auth-input" />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="auth-input" />

                    <button type="submit" className="auth-button">Login</button>
                </form>

                <p className="auth-switch">Don't have an account? <span><Link to="/register">Register</Link></span></p>
            </div>
        </div>
    )
}