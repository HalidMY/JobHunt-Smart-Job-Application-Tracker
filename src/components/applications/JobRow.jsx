export default function JobRow({ job, onClick }) {
    return (
        <tr className="job-row" onClick={onClick}>
            <td><input type="checkbox" /></td>
            <td>{job.title}</td>
            <td>{job.company}</td>
            <td>{job.status}</td>
            <td>{job.location}</td>
            <td>{job.date_applied}</td>
        </tr>
    );
}
