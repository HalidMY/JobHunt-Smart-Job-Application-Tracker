import '../../style/global.css';
import { IoIosAddCircle } from "react-icons/io";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import { MdLocalOffer } from "react-icons/md";
import { BsFillClipboard2CheckFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

export default function DashboardBody() {

    return (
        <main className="dashboard-body">
            <h1>Welcome to your Dashboard!</h1>
            <Link to="/applications/new" className="floating-add-btn">
                <IoIosAddCircle />
            </Link>

            <div className="card-body">
                <div className="card">
                    <div className="icon-wrapper">
                        <BsFillClipboard2CheckFill />
                    </div>
                    <div className="card-info">
                        <h3>Applied</h3>
                        <span>24</span>
                    </div>
                </div>

                <div className="card">
                    <div className="icon-wrapper">
                        <BsFillChatSquareDotsFill />
                    </div>
                    <div className="card-info">
                        <h3>Interview</h3>
                        <span>10</span>
                    </div>
                </div>

                <div className="card">
                    <div className="icon-wrapper">
                        <MdLocalOffer />
                    </div>
                    <div className="card-info">
                        <h3>Offer</h3>
                        <span>5</span>
                    </div>
                </div>
            </div>
        </main>
    );
}