import Sidebar from "../components/dashboard/Sidebar";
import "../style/global.css";

export default function Profile() {

    return (
        <div className="dashboard-page">
            <Sidebar />
            <div className="profile-page">
                <h1>Profile Page</h1>
            </div>
        </div>
        
    )
}