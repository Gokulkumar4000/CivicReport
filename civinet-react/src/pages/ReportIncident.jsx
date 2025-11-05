import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Tag } from '../components/ui';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Sidebar';
import MenuButton from '../components/MenuButton';
import Notification from '../components/Notification';
import { useSidebar } from '../contexts/SidebarContext';
import { useNotification } from '../hooks/useNotification';

const ReportIncident = () => {
  const navigate = useNavigate();
  const { isOpen } = useSidebar();
  const { notifications, showNotification, removeNotification } = useNotification();
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    image: null
  });
  const [tags, setTags] = useState(['Pothole', 'Urgent']);
  const [locationDetected, setLocationDetected] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [addingTag, setAddingTag] = useState(false);
  const [newTagValue, setNewTagValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/report-success');
  };

  const addTag = () => {
    setAddingTag(true);
  };

  const saveNewTag = () => {
    if (newTagValue.trim()) {
      setTags([...tags, newTagValue.trim()]);
      setNewTagValue('');
      setAddingTag(false);
      showNotification('Tag added successfully', 'success');
    }
  };

  const cancelNewTag = () => {
    setNewTagValue('');
    setAddingTag(false);
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
      );
      
      if (!response.ok) {
        throw new Error(`Geocoding service error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data || !data.address) {
        return `${lat.toFixed(6)}°, ${lon.toFixed(6)}°`;
      }
      
      const addr = data.address;
      const parts = [];
      
      // Build detailed address from most specific to general
      if (addr.house_number && addr.road) {
        parts.push(`${addr.house_number} ${addr.road}`);
      } else if (addr.road) {
        parts.push(addr.road);
      }
      
      // Add neighborhood/suburb/district
      if (addr.suburb || addr.neighbourhood || addr.quarter) {
        parts.push(addr.suburb || addr.neighbourhood || addr.quarter);
      }
      
      // Add district if available
      if (addr.city_district || addr.district) {
        parts.push(addr.city_district || addr.district);
      }
      
      // Add city
      if (addr.city || addr.town || addr.village || addr.municipality) {
        parts.push(addr.city || addr.town || addr.village || addr.municipality);
      }
      
      // Add state/region if not already included
      if (addr.state && !parts.some(p => p.includes(addr.state))) {
        parts.push(addr.state);
      }
      
      // Add country if needed
      if (addr.country && parts.length < 3) {
        parts.push(addr.country);
      }
      
      const locationText = parts.length > 0 ? parts.join(', ') : `${lat.toFixed(6)}°, ${lon.toFixed(6)}°`;
      
      return locationText;
    } catch (error) {
      console.error('Geocoding error:', error);
      return `${lat.toFixed(6)}°, ${lon.toFixed(6)}°`;
    }
  };

  const detectLocation = () => {
    setDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          console.log(`Location accuracy: ${accuracy} meters`);
          const locationText = await reverseGeocode(latitude, longitude);
          setFormData(prev => ({...prev, location: locationText}));
          setLocationDetected(true);
          setDetecting(false);
          showNotification('Location detected successfully', 'success');
        },
        (error) => {
          let errorMsg = 'Failed to detect location. ';
          if (error.code === 1) {
            errorMsg += 'Please enable location permissions.';
          } else if (error.code === 2) {
            errorMsg += 'Location information unavailable.';
          } else if (error.code === 3) {
            errorMsg += 'Request timed out.';
          }
          showNotification(errorMsg, 'error');
          setDetecting(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      showNotification('Geolocation is not supported by your browser', 'error');
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
              {addingTag ? (
                <div className="flex items-center gap-2" style={{width: '100%', marginTop: '0.5rem'}}>
                  <input
                    type="text"
                    value={newTagValue}
                    onChange={(e) => setNewTagValue(e.target.value)}
                    placeholder="Enter tag name"
                    className="form-input flex-1"
                    style={{padding: '0.5rem', fontSize: '0.875rem'}}
                    autoFocus
                    onKeyPress={(e) => e.key === 'Enter' && saveNewTag()}
                  />
                  <button 
                    type="button"
                    onClick={saveNewTag}
                    className="p-2 rounded-lg hover:bg-green-50 transition-colors"
                    style={{color: '#22c55e'}}
                  >
                    <span className="material-symbols-outlined">check</span>
                  </button>
                  <button 
                    type="button"
                    onClick={cancelNewTag}
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                    style={{color: '#ef4444'}}
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              ) : (
                <button 
                  type="button"
                  onClick={addTag}
                  className="tag-add-btn"
                >
                  + Add Tag
                </button>
              )}
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
      
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </>
  );
};

export default ReportIncident;
