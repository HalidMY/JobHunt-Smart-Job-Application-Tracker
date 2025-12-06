import { useEffect, useState } from "react";
import "../../style/global.css";

const STATUS_FLOW = ["Applied", "Interviewing", "Negotiating", "Accepted"];

export default function JobDetailPanel({ job, onEdit, onStatusChangeSuccess, onClosePanel }) {
    const [currentStatus, setCurrentStatus] = useState(job?.status || "");
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        setCurrentStatus(job?.status || "");
        setClosing(false);
    }, [job]);

    if (!job) return null;

    const token = localStorage.getItem("token");

    const updateStatus = async (newStatus) => {
        if (!job || !token || newStatus === currentStatus) return;

        try {
            const res = await fetch(`http://localhost:5000/applications/${job.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!res.ok) {
                console.error("Failed to update status");
                return;
            }

            setCurrentStatus(newStatus);
            onStatusChangeSuccess && onStatusChangeSuccess();
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    const handleCloseJob = async () => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;

        await fetch(`http://localhost:5000/applications/${job.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });

        onStatusChangeSuccess();
        onClosePanel();
    };

    const isCompleted = (step) => {
        const currentIndex = STATUS_FLOW.indexOf(currentStatus);
        const stepIndex = STATUS_FLOW.indexOf(step);
        return stepIndex < currentIndex;
    };

    return (
        <aside className={`detail-panel ${closing ? "closing" : ""}`}>
            <div className="job-detail-header">
                <div>
                    <h2 className="job-detail-title">{job.title}</h2>
                    <p className="job-detail-meta">
                        <span className="job-detail-company">{job.company}</span>
                        {job.location && <span> · {job.location}</span>}
                    </p>
                </div>

                <div className="header-actions">
                    <button
                        className="panel-close-btn"
                        onClick={() => {
                            setClosing(true);
                            setTimeout(() => onClosePanel(), 350);
                        }}
                    >
                        ✕
                    </button>
                    <button className="job-detail-edit-btn" onClick={() => onEdit(job)}>✏️ Edit</button>
                </div>
            </div>

            <div className="status-pipeline">
                {STATUS_FLOW.map((step) => {
                    const active = currentStatus === step;
                    const completed = isCompleted(step);

                    return (
                        <button
                            key={step}
                            type="button"
                            className={[
                                "status-step",
                                active ? "status-step-active" : "",
                                completed ? "status-step-completed" : ""
                            ].join(" ")}
                            onClick={() => updateStatus(step)}
                        >
                            {step}
                        </button>
                    );
                })}

                <button
                    type="button"
                    className="status-close-btn"
                    onClick={handleCloseJob}
                >
                    Close Job
                </button>
            </div>

            <div className="job-detail-section">
                <h3 className="job-detail-section-title">Notes</h3>
                <p className="job-detail-notes">
                    {job.notes && job.notes.trim().length > 0
                        ? job.notes
                        : "No notes yet."}
                </p>
            </div>
        </aside>
    );
}
