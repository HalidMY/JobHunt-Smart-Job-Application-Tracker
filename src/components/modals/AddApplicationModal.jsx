import { useEffect, useState } from "react";
import "../../style/global.css";

export default function AddApplicationModal({ onClose, onSaved, jobData }) {
  const isEdit = !!jobData;

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobUrl: "",
    applicationDate: "",
    companyName: "",
    location: "",
    notes: "",
    status: "Applied"
  });

  useEffect(() => {
    if (jobData) {
      setFormData({
        jobTitle: jobData.title || "",
        jobUrl: jobData.job_url || "",
        applicationDate: jobData.date_applied || "",
        companyName: jobData.company || "",
        location: jobData.location || "",
        notes: jobData.notes || "",
        status: jobData.status || "Applied"
      });
    }
  }, [jobData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const todayStr = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.applicationDate && formData.applicationDate > todayStr) {
      alert("Application date cannot be in the future.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const url = isEdit
        ? `http://localhost:5000/applications/${jobData.id}`
        : "http://localhost:5000/applications";

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Save failed:", data);
        alert(data.error || "Something went wrong.");
        return;
      }

      onSaved && onSaved();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{isEdit ? "Edit Application" : "Add a New Application"}</h2>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Job Title *</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Job Title"
              required
            />
          </div>

          <div className="form-group">
            <label>Company Name *</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              required
            />
          </div>

          <div className="form-group">
            <label>Job URL from Original Post *</label>
            <input
              type="url"
              name="jobUrl"
              value={formData.jobUrl}
              onChange={handleChange}
              placeholder="https://..."
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
            />
          </div>

          <div className="form-group">
            <label>Application Date *</label>
            <input
              type="date"
              name="applicationDate"
              value={formData.applicationDate}
              onChange={handleChange}
              max={todayStr}
              required
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
        </form>

        <div className="modal-actions">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" onClick={handleSubmit} className="btn-primary">
            {isEdit ? "Save Changes" : "Add Application"}
          </button>
        </div>
      </div>
    </div>
  );
}
