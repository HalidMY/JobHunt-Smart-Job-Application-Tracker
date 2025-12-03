import { useState } from "react";
import "../style/global.css";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const res = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) navigate("/login");
        else alert("Unable to register");
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <form onSubmit={submit} className="auth-form">
                    <h2 className="auth-title">Register Account</h2>

                    <input className="auth-input" placeholder="Username" required
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                    />

                    <input className="auth-input" type="email" placeholder="Email" required
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <input className="auth-input" type="password" placeholder="Password" required
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    <input className="auth-input" type="password" placeholder="Confirm Password" required
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    />

                    <button className="auth-button">Register</button>
                </form>

                <p className="auth-switch">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}
