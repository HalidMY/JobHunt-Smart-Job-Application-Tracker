import { useState } from "react";
import "../style/global.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.access_token);
            navigate("/dashboard");
        } else {
            alert(data.error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">

                <form onSubmit={submit} className="auth-form">
                    <h2 className="auth-title">Login to Your Account</h2>

                    <input className="auth-input" type="email"
                        placeholder="Email" required
                        onChange={e => setForm({ ...form, email: e.target.value })}
                    />

                    <input className="auth-input" type="password"
                        placeholder="Password" required
                        onChange={e => setForm({ ...form, password: e.target.value })}
                    />

                    <button className="auth-button">Login</button>
                </form>

                <p className="auth-switch">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}
