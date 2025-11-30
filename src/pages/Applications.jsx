import "../style/global.css";
import Sidebar from "../components/dashboard/Sidebar";
import { useState, useEffect } from "react";


export default function Applications() {
    const [applications, setApplications] = useState([]);
    const [draggedId, setDraggedId] = useState(null);

    const handleDragStart = (id) => {
        setDraggedId(id);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = async (newStatus) => {
        if (!draggedId) return;

        setApplications((prev) => prev.map((app) => app.id === draggedId ? { ...app, status: newStatus } : app));

        const token = localStorage.getItem("token");
        try {
            await fetch(`http://localhost:5000/applications/${draggedId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });
        } catch (err) {
            console.error(err);
        }

        setDraggedId(null);
    }


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
                    <div
                        key={app.id}
                        className="kanban-card"
                        draggable
                        onDragStart={() => handleDragStart(app.id)}
                    >
                        <h3 className="kanban-card-title">{app.title}</h3>
                        <p className="kanban-card-company">{app.company}</p>
                    </div>
                ))
            : null;


    return (
        <div className="kanban">
            <Sidebar />
            <div className="kanban-board">
                <div className="kanban-column" data-status="applied"
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop("Applied")}>
                    <h2 className="kanban-column-title">Applied</h2>
                    <div className="kanban-column-content">
                        {renderColumn("Applied")}
                    </div>
                </div>

                <div className="kanban-column" data-status="interview"
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop("Interview")}>
                    <h2 className="kanban-column-title">Interview</h2>
                    <div className="kanban-column-content">
                        {renderColumn("Interview")}
                    </div>
                </div>

                <div className="kanban-column" data-status="offer"
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop("Offer")}>
                    <h2 className="kanban-column-title">Offer</h2>
                    <div className="kanban-column-content">
                        {renderColumn("Offer")}
                    </div>
                </div>
            </div>
        </div>
    )
}