import '../../style/global.css';
import { IoIosAddCircle } from "react-icons/io";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import { MdLocalOffer } from "react-icons/md";
import { BsFillClipboard2CheckFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import AddApplicationModal from '../modals/AddApplicationModal';


export default function DashboardBody() {
    const [showModal, setShowModal] = useState(false);
    const [applications, setApplications] = useState([]);

    useEffect (() => {
        const fetchData = async () => {
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
            }catch (err) {
                console.error(err);
            }
        };
        fetchData();
    },[]);

    const getCountByStatus = (status) => {
        if (!Array.isArray(applications)) return 0;
        return applications.filter(app => app.status === status).length;
    };

    return (
        <main className="dashboard-body">
            <h1>Welcome to your Dashboard!</h1>
            <button className="floating-add-btn" onClick={() => setShowModal(true)}><IoIosAddCircle /></button>
            {showModal && (<AddApplicationModal onClose={() => setShowModal(false)} />)}

            <div className="card-body">
                <div className="card">
                    <div className="icon-wrapper">
                        <BsFillClipboard2CheckFill />
                    </div>
                    <div className="card-info">
                        <h3>Applied</h3>
                        <span>{getCountByStatus("Applied")}</span>
                    </div>
                </div>

                <div className="card">
                    <div className="icon-wrapper">
                        <BsFillChatSquareDotsFill />
                    </div>
                    <div className="card-info">
                        <h3>Interview</h3>
                        <span>{getCountByStatus("Interview")}</span>
                    </div>
                </div>

                <div className="card">
                    <div className="icon-wrapper">
                        <MdLocalOffer />
                    </div>
                    <div className="card-info">
                        <h3>Offer</h3>
                        <span>{getCountByStatus("Offer")}</span>
                    </div>
                </div>
            </div>
        </main>
    );
}