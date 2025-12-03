import { useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import ApplicationsTable from "../components/applications/ApplicationsTable";
import JobDetailPanel from "../components/applications/JobDetailPanel";

export default function Applications() {
    const [selectedJob, setSelectedJob] = useState(null);

    return (
        <PageWrapper>
            <div className="applications-container">
                <ApplicationsTable setSelectedJob={setSelectedJob} />
                <JobDetailPanel job={selectedJob} />
            </div>
        </PageWrapper>
    );
}
