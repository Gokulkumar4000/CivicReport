import { useState } from 'react';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ reportTitle, onConfirm, onCancel, onFileComplaint }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [showComplaintForm, setShowComplaintForm] = useState(false);

  const deleteReasons = [
    { id: 'resolved', label: 'Issue Resolved', icon: 'check_circle' },
    { id: 'duplicate', label: 'Duplicate Report', icon: 'content_copy' },
    { id: 'spam', label: 'Spam/Fake', icon: 'block' },
    { id: 'wrong_location', label: 'Wrong Location', icon: 'location_off' },
    { id: 'mistake', label: 'Posted by Mistake', icon: 'error' },
    { id: 'other', label: 'Other Reason', icon: 'more_horiz' }
  ];

  const handleConfirmDelete = () => {
    if (!selectedReason) {
      return;
    }
    onConfirm({
      reason: selectedReason,
      details: additionalDetails
    });
  };

  const handleFileComplaint = () => {
    onFileComplaint({
      reportTitle,
      complaintDetails: additionalDetails
    });
  };

  if (showComplaintForm) {
    return (
      <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && onCancel()}>
        <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <span className="material-symbols-outlined" style={{color: '#ef4444', fontSize: '2.5rem'}}>
              report
            </span>
            <h2>File a Complaint</h2>
            <p className="modal-subtitle">Report threats or harassment to authorities</p>
          </div>

          <div className="modal-body">
            <div className="complaint-info">
              <div className="info-box">
                <span className="material-symbols-outlined">info</span>
                <p>If you're being threatened or pressured by someone to delete this report, please file a complaint. Your safety is our priority.</p>
              </div>
            </div>

            <div className="form-group">
              <label>Report Being Threatened:</label>
              <div className="report-title-display">{reportTitle}</div>
            </div>

            <div className="form-group">
              <label>Describe the Threat or Harassment: *</label>
              <textarea
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                placeholder="Please provide details about the threat, who threatened you, and any other relevant information..."
                rows="6"
                className="complaint-textarea"
              />
            </div>

            <div className="info-box warning">
              <span className="material-symbols-outlined">shield</span>
              <p>Your complaint will be reviewed by our team and forwarded to appropriate authorities if necessary. Your identity will be protected.</p>
            </div>
          </div>

          <div className="modal-footer">
            <button 
              className="btn-secondary" 
              onClick={() => setShowComplaintForm(false)}
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Go Back
            </button>
            <button 
              className="btn-danger"
              onClick={handleFileComplaint}
              disabled={!additionalDetails.trim()}
            >
              <span className="material-symbols-outlined">send</span>
              Submit Complaint
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && onCancel()}>
      <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="material-symbols-outlined" style={{color: '#ef4444', fontSize: '2.5rem'}}>
            delete_forever
          </span>
          <h2>Delete Report?</h2>
          <p className="modal-subtitle">This action cannot be undone</p>
        </div>

        <div className="modal-body">
          <div className="report-info">
            <p className="report-title-label">Report:</p>
            <p className="report-title-value">{reportTitle}</p>
          </div>

          <div className="form-group">
            <label>Why are you deleting this report? *</label>
            <div className="reason-buttons">
              {deleteReasons.map(reason => (
                <button
                  key={reason.id}
                  className={`reason-btn ${selectedReason === reason.id ? 'selected' : ''}`}
                  onClick={() => setSelectedReason(reason.id)}
                >
                  <span className="material-symbols-outlined">{reason.icon}</span>
                  <span>{reason.label}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedReason && (
            <div className="form-group fade-in">
              <label>Additional Details (Optional):</label>
              <textarea
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                placeholder="Any additional information about why you're deleting this report..."
                rows="3"
                className="details-textarea"
              />
            </div>
          )}

          <div className="threat-notice">
            <div className="notice-content">
              <span className="material-symbols-outlined">security</span>
              <div>
                <p className="notice-title">Being Threatened?</p>
                <p className="notice-text">If someone is pressuring you to delete this report, please file a complaint instead.</p>
              </div>
            </div>
            <button 
              className="btn-file-complaint"
              onClick={() => setShowComplaintForm(true)}
            >
              <span className="material-symbols-outlined">report</span>
              File Complaint
            </button>
          </div>
        </div>

        <div className="modal-footer">
          <button 
            className="btn-secondary" 
            onClick={onCancel}
          >
            <span className="material-symbols-outlined">close</span>
            Cancel
          </button>
          <button 
            className="btn-danger"
            onClick={handleConfirmDelete}
            disabled={!selectedReason}
          >
            <span className="material-symbols-outlined">delete</span>
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
