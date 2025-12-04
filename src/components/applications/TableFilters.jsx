export default function TableFilters({ stats, onAddNew }) {
    return (
        <>
            <div className="status-cards">
                <div className="status-card">Applied: {stats.applied}</div>
                <div className="status-card">Interviewing: {stats.interviewing}</div>
                <div className="status-card">Negotiating: {stats.negotiating}</div>
                <div className="status-card">Accepted: {stats.accepted}</div>
            </div>

            <div className="filters-bar">
                <input className="filter-search" placeholder="Filter jobs..." />

                <select className="filter-group">
                    <option>Group by: None</option>
                    <option>Company</option>
                    <option>Status</option>
                    <option>Date</option>
                </select>

                <button className="btn-columns">Columns</button>
                <button className="btn-menu">Menu</button>
                <button className="btn-add" onClick={onAddNew}>+ Add Job</button>
            </div>
        </>
    );
}
