import { useState } from "react";
import '../style/global.css';
import { Link } from "react-router-dom";

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <form onSubmit={handleSubmit} className="auth-form">
                <h2 className="auth-title">Register Account</h2>

                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required className="auth-input" />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="auth-input" />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="auth-input" />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="auth-input" />

                <button type="submit" className="auth-button">Register</button>
            </form>

            <p className="auth-switch">Already have an account? <span><Link to="/login">Login</Link></span></p>
            </div>
        </div>
    )
}