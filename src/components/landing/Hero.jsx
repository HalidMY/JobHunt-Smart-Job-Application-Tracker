import { Link } from 'react-router-dom';
import '../../style/global.css';
import DashboardPreview from './DashboardPreview';

export default function Hero() {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1>
                    Track your job
                    <br /> applications
                    <br /> with ease
                </h1>
                <p>
                JobHunt helps you organize and
                manage your job search efficiently,
                all in one place.
                </p>
                <Link to="/register" className="hero-button">Get Started</Link>
            </div>
            <DashboardPreview />
        </section>
    )
}