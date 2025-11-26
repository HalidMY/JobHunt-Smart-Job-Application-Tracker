//import { useState } from "react";
import '../style/global.css';
import Sidebar from '../components/dashboard/Sidebar.jsx';
import DashboardBody from '../components/dashboard/DashboardBody.jsx';

export default function Dashboard() {

    return (
        <div className="dashboard-page">
            <Sidebar />
            <DashboardBody />
        </div>
    );    
}