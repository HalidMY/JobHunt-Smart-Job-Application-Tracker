export default function JobDetailPanel({ job }) {
    if (!job) return null;

    return (
        <div className="detail-panel">
            <h2>{job.title}</h2>
            <p>{job.company}</p>

            <div className="status-tabs">
                <span className={job.status === "Applied" ? "active" : ""}>Applied</span>
                <span className={job.status === "Interview" ? "active" : ""}>Interview</span>
                <span className={job.status === "Offer" ? "active" : ""}>Offer</span>
            </div>

            <div className="detail-section">
                <h3>Notes</h3>
                <p>{job.notes || "No notes yet"}</p>
            </div>
        </div>
    );
}
