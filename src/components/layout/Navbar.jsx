import { Link } from "react-router-dom";
import "../../style/global.css";

export default function NavBar() {
    return (
        <header className="landing-navbar">
            <div className="logo">JobHunt</div>

            <nav className="nav-actions">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </header>
    );
}