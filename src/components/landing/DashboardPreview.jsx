import '../../style/global.css';


export default function DashboardPreview() {
    return (
        <div className="dashboard-preview">
            <h3>Dashboard</h3>
            <div className="stats-row">
                <div className="stat-box">
                    Applied
                    <span>35</span>
                </div>
                <div className="stat-box">
                    Interview
                    <span>12</span>
                </div>
                <div className="stat-box">
                    Offer
                    <span>5</span>
                </div>
            </div>

            <h4>Job Applications</h4>
            <div className="app-row">
                <strong>Google</strong>
                <span>Software Engineer</span>
                <span className="tag applied">Applied</span>
            </div>
            <div className="app-row">
                <strong>Meta</strong>
                <span>Software Developer</span>
                <span className="tag offer">Offer</span>
            </div>
            <div className="app-row">
                <strong>Microsoft</strong>
                <span>Manager</span>
                <span className="tag applied">Applied</span>
            </div>
            <div className="app-row">
                <strong>Apple</strong>
                <span>Sr Software Developer</span>
                <span className="tag interview">Interview</span>
            </div>
        </div>
    );
}