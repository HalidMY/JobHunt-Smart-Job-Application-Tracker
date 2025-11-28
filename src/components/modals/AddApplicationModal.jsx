import { useState } from "react";
import '../../style/modal.css';

export default function AddApplicationModal({ onClose }) {

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobUrl: "",
    applicationDate: "",
    companyName: "",
    notes: "",
    status: "Applied"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await fetch("http://localhost:5000/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const statuses = ["Applied", "Interview", "Offer", "Rejected"];

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Add Application</h2>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">

          <div className="form-group">
            <label>Job Title *</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
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
              required
            />
          </div>

          <div className="form-group">
            <label>Job URL *</label>
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
            <label>Application Date *</label>
            <input
              type="date"
              name="applicationDate"
              value={formData.applicationDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>

            <div 
              className="status-select" 
              onClick={() => setOpen(!open)}
            >
              {formData.status}
              <span className="arrow">▾</span>
            </div>

            {open && (
              <div className="status-options">
                {statuses.map(status => (
                  <div
                    key={status}
                    className="status-option"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, status }));
                      setOpen(false);
                    }}
                  >
                    {status}
                  </div>
                ))}
              </div>
            )}
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
          <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
          <button type="submit" onClick={handleSubmit} className="btn-primary">
            Add Application
          </button>
        </div>
      </div>
    </div>
  );
}
