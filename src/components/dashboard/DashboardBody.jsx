import { useEffect, useState } from "react";
import "../../style/global.css";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import { MdLocalOffer } from "react-icons/md";
import { BsFillClipboard2CheckFill } from "react-icons/bs";

export default function DashboardBody() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:5000/applications", {
                headers: { "Authorization": `Bearer ${token}` }
            });

            const data = await res.json();
            setApplications(Array.isArray(data) ? data : []);
        };

        fetchData();
    }, []);

    const getCount = (status) =>
        applications.filter(a => a.status === status).length;

    return (
        <div className="dashboard-body">
            <h1>Welcome to your Dashboard!</h1>

            <div className="dashboard-card-grid">
                
                <div className="dashboard-card">
                    <div className="card-icon"><BsFillClipboard2CheckFill /></div>
                    <h3>Applied</h3>
                    <span>{getCount("Applied")}</span>
                </div>

                <div className="dashboard-card">
                    <div className="card-icon"><BsFillChatSquareDotsFill /></div>
                    <h3>Interview</h3>
                    <span>{getCount("Interview")}</span>
                </div>

                <div className="dashboard-card">
                    <div className="card-icon"><MdLocalOffer /></div>
                    <h3>Offer</h3>
                    <span>{getCount("Offer")}</span>
                </div>

            </div>
        </div>
    );
}