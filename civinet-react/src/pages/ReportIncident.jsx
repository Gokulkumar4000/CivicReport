import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Tag } from '../components/ui';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Sidebar';
import MenuButton from '../components/MenuButton';
import { useSidebar } from '../contexts/SidebarContext';

const ReportIncident = () => {
  const navigate = useNavigate();
  const { isOpen } = useSidebar();
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    image: null
  });
  const [tags, setTags] = useState(['Pothole', 'Urgent']);
  const [locationDetected, setLocationDetected] = useState(false);
  const [detecting, setDetecting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/report-success');
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

  const detectLocation = () => {
    setDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Format coordinates correctly based on sign
          const latDir = latitude >= 0 ? 'N' : 'S';
          const lonDir = longitude >= 0 ? 'E' : 'W';
          const location = `${Math.abs(latitude).toFixed(4)}°${latDir}, ${Math.abs(longitude).toFixed(4)}°${lonDir}`;
          setFormData(prev => ({...prev, location}));
          setLocationDetected(true);
          setDetecting(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Don't set locationDetected on error so user can retry
          setDetecting(false);
        }
      );
    } else {
      // Browser doesn't support geolocation
      console.error('Geolocation not supported');
      setDetecting(false);
    }
  };

  return (
    <>
      <Sidebar />
      <MenuButton />
      <div className={`flex flex-col justify-between has-bottom-nav main-content-with-sidebar ${!isOpen ? 'sidebar-collapsed' : ''}`} style={{minHeight: '100vh'}}>
      <div className="flex-grow overflow-y-auto">
        <header className="report-header">
          <div className="text-center" style={{paddingTop: '1rem'}}>
            <h1 className="text-2xl font-bold">Report Incident</h1>
            <p style={{fontSize: '0.875rem', opacity: 0.9, marginTop: '0.25rem'}}>Help make your community safer</p>
          </div>
        </header>

        <form onSubmit={handleSubmit} style={{paddingBottom: '2rem'}}>
          <div className="report-form-section">
            <div className="section-title">
              <span className="material-symbols-outlined text-primary">description</span>
              Incident Description
            </div>
            <textarea
              className="form-textarea w-full"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe what happened in detail..."
              rows={5}
              required
            />
          </div>

          <div className="report-form-section">
            <div className="section-title">
              <span className="material-symbols-outlined text-primary">add_location</span>
              Location (Required)
            </div>
            <input
              className="form-input"
              value={formData.location}
              placeholder="Location will be auto-detected"
              readOnly
              style={{cursor: 'not-allowed', background: '#f9fafb'}}
            />
            <button 
              type="button"
              onClick={detectLocation}
              disabled={detecting || locationDetected}
              className="location-btn"
              style={{
                marginTop: '1rem',
                width: '100%',
                padding: '0.75rem',
                background: locationDetected ? '#10b981' : 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: detecting || locationDetected ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontWeight: 600
              }}
            >
              <span className="material-symbols-outlined">
                {locationDetected ? 'check_circle' : 'my_location'}
              </span>
              {detecting ? 'Detecting...' : locationDetected ? 'Location Detected' : 'Detect Location'}
            </button>
          </div>

          <div className="report-form-section">
            <div className="section-title">
              <span className="material-symbols-outlined text-primary">image</span>
              Add Photo
            </div>
            <div className="image-upload-area">
              <span className="material-symbols-outlined">add_photo_alternate</span>
              <p style={{color: 'var(--text-secondary-light)', fontSize: '0.875rem'}}>
                <span className="font-medium">Tap to add photo</span><br/>
                <span style={{fontSize: '0.75rem'}}>Supports JPG, PNG (max 5MB)</span>
              </p>
            </div>
          </div>

          <div className="report-form-section">
            <div className="section-title">
              <span className="material-symbols-outlined text-primary">label</span>
              Tags
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Tag key={index} onRemove={() => removeTag(index)}>{tag}</Tag>
              ))}
              <button 
                type="button"
                onClick={addTag}
                className="tag-add-btn"
              >
                + Add Tag
              </button>
            </div>
          </div>

          <div style={{padding: '0 1rem', marginBottom: '2rem'}}>
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={!locationDetected}
            >
              <span className="material-symbols-outlined">send</span>
              <span>Submit Report</span>
            </button>
            {!locationDetected && (
              <p style={{textAlign: 'center', marginTop: '0.5rem', fontSize: '0.875rem', color: '#9ca3af'}}>
                Please detect your location to enable submit
              </p>
            )}
          </div>
          
          <div style={{height: '5rem'}}></div>
        </form>
      </div>
      
      <BottomNav />
      </div>
    </>
  );
};

export default ReportIncident;
