import "../style/global.css";
import Sidebar from "../components/dashboard/Sidebar";
import { useState, useEffect } from "react";


export default function Applications() {
    const [applications, setApplications] = useState([]);

   
    useEffect(() => {
         const fetchApplications = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch("http://localhost:5000/applications", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await res.json();
                setApplications(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchApplications();
    }, []);

    const renderColumn = (status) =>
        Array.isArray(applications)
            ? applications
                .filter((app) => app.status === status)
                .map((app) => (
                <div key={app.id} className="kanban-card">
                    <h3 className="kanban-card-title">{app.title}</h3>
                    <p className="kanban-card-company">{app.company}</p>
                </div>
                ))
            : null;



    return (
        <div className="kanban">
            <Sidebar />
            <div className="kanban-board">
                <div className="kanban-column" data-status="applied">
                    <h2 className="kanban-column-title">Applied</h2>
                    <div className="kanban-column-content">
                        { renderColumn("Applied") }
                    </div>
                </div>
                <div className="kanban-column" data-status="interview">
                    <h2 className="kanban-column-title">Interview</h2>
                    <div className="kanban-column-content">
                        { renderColumn("Interview") }
                    </div>
                </div>
                <div className="kanban-column" data-status="offer">
                    <h2 className="kanban-column-title">Offer</h2>
                    <div className="kanban-column-content">
                       { renderColumn("Offer") }
                    </div>
                </div>
            </div>
        </div>
    )
}