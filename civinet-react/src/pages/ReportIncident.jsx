import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Tag } from '../components/ui';

const ReportIncident = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: '',
    location: 'San Francisco',
    image: null
  });
  const [tags, setTags] = useState(['Pothole', 'Urgent']);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit report logic here
    alert('Report submitted successfully!');
    navigate('/feed');
  };

  const addTag = () => {
    const newTag = prompt('Enter tag name:');
    if (newTag && newTag.trim()) {
      setTags([...tags, newTag.trim()]);
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col justify-between has-bottom-nav" style={{minHeight: '100vh'}}>
      <div className="flex-grow overflow-y-auto">
        <header className="report-header">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/feed')}
              style={{background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '0.5rem'}}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">add_circle</span>
              <h1 className="text-lg font-bold">Report Incident</h1>
            </div>
            <div style={{width: '2.5rem'}}></div>
          </div>
        </header>

        <form onSubmit={handleSubmit} style={{paddingBottom: '6rem'}}>
          <div className="report-form-section">
            <h3 className="section-title">
              <span className="material-symbols-outlined">description</span>
              Describe the Issue
            </h3>
            <textarea
              className="form-input"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe what happened..."
              rows={6}
              style={{width: '100%', minHeight: '120px'}}
              required
            />
          </div>

          <div className="report-form-section">
            <h3 className="section-title">
              <span className="material-symbols-outlined">location_on</span>
              Location
            </h3>
            <input
              className="form-input"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Enter location"
              required
            />
          </div>

          <div className="report-form-section">
            <h3 className="section-title">
              <span className="material-symbols-outlined">photo_camera</span>
              Add Photo
            </h3>
            <div className="image-upload-area">
              <span className="material-symbols-outlined">add_photo_alternate</span>
              <p style={{fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem'}}>Upload an Image</p>
              <p style={{color: '#617589'}}>Click to browse or drag and drop</p>
            </div>
          </div>

          <div className="report-form-section">
            <h3 className="section-title">
              <span className="material-symbols-outlined">label</span>
              Tags
            </h3>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
              {tags.map((tag, index) => (
                <Tag key={index} onRemove={() => removeTag(index)}>{tag}</Tag>
              ))}
              <button 
                type="button"
                onClick={addTag}
                style={{padding: '0.5rem 1rem', border: '2px dashed #137fec', background: 'transparent', color: '#137fec', borderRadius: '9999px', cursor: 'pointer'}}
              >
                + Add Tag
              </button>
            </div>
          </div>

          <div className="p-4">
            <Button 
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              className="submit-btn"
            >
              <span className="material-symbols-outlined">send</span>
              Submit Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIncident;
