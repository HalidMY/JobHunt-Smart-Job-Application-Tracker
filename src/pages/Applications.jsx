import { useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import ApplicationsTable from "../components/applications/ApplicationsTable";
import JobDetailPanel from "../components/applications/JobDetailPanel";
import AddApplicationsModal from "../components/modals/AddApplicationModal"

export default function Applications() {
    const [selectedJob, setSelectedJob] = useState(null);
    const [showModal, setShowModal] = useState(false)

    const openModalHandler = () => {
        setShowModal(true)
    }

    return (
        <PageWrapper>
            <div className="applications-container">
                <ApplicationsTable setSelectedJob={setSelectedJob} onOpenModal={openModalHandler} />
                { showModal && <AddApplicationsModal onClose={() => setShowModal(false)} /> }
                <JobDetailPanel job={selectedJob} />
            </div>
        </PageWrapper>
    );
}
