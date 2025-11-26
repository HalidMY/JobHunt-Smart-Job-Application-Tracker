import '../../style/global.css';
import { Link } from 'react-router-dom';
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaBriefcase, FaUser } from "react-icons/fa";

export default function Sidebar() {
    return (
        <aside className="dashboard-sidebar">
            <div className="sidebar-logo">JobHunt</div>
            <nav className="sidebar-nav">
                <Link to="/dashboard" className="active">
                    <MdDashboard className="nav-icon" />
                    Dashboard
                </Link>
                <Link to="/applications">
                    <FaBriefcase className="nav-icon" />
                    Applications
                </Link>
                <Link to="/profile">
                    <FaUser className="nav-icon" />
                    Profile
                </Link>
                <Link to="/logout">
                    <MdLogout className="nav-icon" />
                    Logout
                </Link>
            </nav>
        </aside>
    );
}