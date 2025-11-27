import { useState } from "react";
import '../style/global.css';
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        });

        const data = await res.json();
        if (res.ok) {
            navigate("/dashboard"); 
        } else {
            alert(data.error);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <form onSubmit={handleSubmit} className="auth-form">
                    <h2 className="auth-title">Login to Your Account</h2>

                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required autoComplete="off" className="auth-input" />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required autoComplete="current-password" className="auth-input" />

                    <button type="submit" className="auth-button">Login</button>
                </form>

                <p className="auth-switch">Don't have an account? <span><Link to="/register">Register</Link></span></p>
            </div>
        </div>
    )
}