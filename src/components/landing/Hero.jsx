import heroTable from "../../assets/hero-mockup.png";

export default function Hero() {
    return (
        <section className="hero-section">
            <div className="hero-left">
                <p className="hero-label">Your Personal Job Organizer</p>

                <h1 className="hero-heading">
                    Track Your Job <br /> Applications Effortlessly
                </h1>

                <p className="hero-desc">
                    A simple and powerful tool to save jobs, track your progress,
                    and stay organized throughout your job search.
                </p>

                <ul className="hero-list">
                    <li>🗂️ Keep all your job applications organized</li>
                    <li>📊 Track progress across all stages</li>
                    <li>📌 Stay on top of every application stage</li>
                </ul>

                <a href="/register" className="hero-btn">Get Started Free</a>
            </div>

            <div className="hero-right">
                <img src={heroTable} alt="Preview" className="hero-mockup" />
            </div>
        </section>
    );
}