import Sidebar from "./Sidebar";
import "../../style/global.css";

export default function PageWrapper({ children }) {
    return (
        <div className="app-layout">
            <aside className="layout-sidebar">
                <Sidebar />
            </aside>

            <main className="main-content">
                {children}
            </main>
        </div>
    );
}
