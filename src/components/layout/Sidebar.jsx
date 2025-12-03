import '../../style/global.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaBriefcase, FaUser } from "react-icons/fa";

export default function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <aside className="dashboard-sidebar">
            <div className="sidebar-logo">JobHunt</div>
            <nav className="sidebar-nav">
                <NavLink to="/dashboard" className="sidebar-link">
                    <MdDashboard className="nav-icon" />
                    Dashboard
                </NavLink>

                <NavLink to="/applications" className="sidebar-link">
                    <FaBriefcase className="nav-icon" />
                    Applications
                </NavLink>

                <NavLink to="/profile" className="sidebar-link">
                    <FaUser className="nav-icon" />
                    Profile
                </NavLink>

                <button type="button" onClick={handleLogout} className="sidebar-link sidebar-logout-btn">
                    <MdLogout className="nav-icon" />
                    Logout
                </button>
            </nav>
        </aside>
    );
}