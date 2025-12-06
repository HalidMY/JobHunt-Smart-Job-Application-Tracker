import { useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import ApplicationsTable from "../components/applications/ApplicationsTable";
import JobDetailPanel from "../components/applications/JobDetailPanel";
import AddApplicationModal from "../components/modals/AddApplicationModal";

export default function Applications() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  const handleAddNew = () => {
    setEditingJob(null);
    setShowModal(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingJob(null);
  };

  const handleJobSaved = () => {
    setShowModal(false);
    setEditingJob(null);
    setReloadFlag((prev) => prev + 1);
  };

  const handleStatusChanged = () => {
    setReloadFlag((prev) => prev + 1);
  };

  return (
    <PageWrapper>
      <div className="applications-container">
        <ApplicationsTable
          setSelectedJob={setSelectedJob}
          onAddNew={handleAddNew}
          reloadFlag={reloadFlag}
        />

        <JobDetailPanel
          job={selectedJob}
          onEdit={handleEditJob}
          onStatusChangeSuccess={handleStatusChanged}
          onClosePanel={() => setSelectedJob(null)}
        />

        {showModal && (
          <AddApplicationModal
            onClose={handleModalClose}
            onSaved={handleJobSaved}
            jobData={editingJob} // null for add, object for edit
          />
        )}
      </div>
    </PageWrapper>
  );
}
