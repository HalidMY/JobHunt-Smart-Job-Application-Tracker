import { useEffect, useState } from "react";
import TableFilters from "./TableFilters";
import JobRow from "./JobRow";

export default function ApplicationsTable({ setSelectedJob, onOpenModal }) {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const load = async () => {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:5000/applications", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await res.json();
            setJobs(Array.isArray(data) ? data : []);
        };

        load();
    }, []);

    const stats = {
        applied: jobs.filter(j => j.status === "Applied").length,
        interviewing: jobs.filter(j => j.status === "Interview").length,
        negotiating: jobs.filter(j => j.status === "Negotiating").length,
        accepted: jobs.filter(j => j.status === "Accepted").length,
    };

    return (
        <>
            <TableFilters stats={stats} onAddNew={onOpenModal} />

            <table className="applications-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Job Position</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Location</th>
                        <th>Date Applied</th>
                    </tr>
                </thead>

                <tbody>
                    {jobs.map(job => (
                        <JobRow
                            key={job.id}
                            job={job}
                            onClick={() => setSelectedJob(job)}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
}
