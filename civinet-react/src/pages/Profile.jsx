import { useState } from 'react';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Sidebar';
import Notification from '../components/Notification';
import { useSidebar } from '../contexts/SidebarContext';
import { useNotification } from '../hooks/useNotification';

const Profile = () => {
  const { isOpen } = useSidebar();
  const { notifications, showNotification, removeNotification } = useNotification();
  const [profileData, setProfileData] = useState({
    name: 'Dravid',
    phone: '+91 9876543210',
    email: 'ethan.carter@email.com',
    aadhar: 'XXXX XXX 123',
    joinedYear: '2021',
    profileVisible: true,
    defaultLocation: localStorage.getItem('userCity') || 'San Francisco, CA',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7bWPSjarPI3FB4VGma7TBRV0CmPhPYkJViKaGEAy6ik8biv5IWfi_Hj7tQvDNGnhXS6s3JX-NlpG4EUFmwrRPOaK931I-NA3BOU6fIyOkOAOfVT9caBNGCubQkFPePFobJOjJw2_RSGbcyTO9KgpEsNBrfM70Pou6Va281zpG2QSAFUcoH7b6vFEg9m27hNYFH-dMFdRQbfhRPCusCt2l2kpaGCBLam9owDV_vozZiUy5FqDA8-vZDlYmIA-I1o4V62wmCeMo8OFJ'
  });
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('appLanguage') || 'English');

  const toggleVisibility = (e) => {
    setProfileData({...profileData, profileVisible: e.target.checked});
  };

  const startEdit = (field, currentValue) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const saveEdit = (field) => {
    if (editValue.trim()) {
      setProfileData(prev => ({...prev, [field]: editValue.trim()}));
    }
    setEditingField(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`
      );
      const data = await response.json();
      const city = data.address.city || data.address.town || data.address.village || data.address.county;
      const district = data.address.suburb || data.address.neighbourhood || '';
      const locationText = district ? `${city}, ${district}` : city;
      return locationText;
    } catch (error) {
      showNotification('Could not fetch location name', 'error');
      return `${lat.toFixed(4)}°, ${lon.toFixed(4)}°`;
    }
  };

  const getLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const locationText = await reverseGeocode(latitude, longitude);
          setProfileData(prev => ({...prev, defaultLocation: locationText}));
          localStorage.setItem('userCity', locationText);
          showNotification('Location updated successfully', 'success');
          setIsGettingLocation(false);
        },
        (error) => {
          showNotification('Failed to detect location. Please enable location services.', 'error');
          setIsGettingLocation(false);
        }
      );
    } else {
      showNotification('Geolocation is not supported by your browser', 'error');
      setIsGettingLocation(false);
    }
  };

  return (
    <>
      <Sidebar />
      <div className={`flex flex-col min-h-screen has-bottom-nav main-content-with-sidebar ${!isOpen ? 'sidebar-collapsed' : ''}`}>
      <header className="header-sticky flex items-center justify-center px-4 py-3">
        <h1 className="text-lg font-bold">Profile</h1>
      </header>

      <main className="p-4 flex-grow" style={{paddingBottom: '6rem'}}>
        <section className="mb-8 flex flex-col items-center gap-4">
          <div 
            style={{
              width: '8rem',
              height: '8rem',
              borderRadius: '50%',
              backgroundImage: `url(${profileData.avatar})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="text-center">
            <h2 className="text-2xl font-bold">{profileData.name}</h2>
            <p className="text-secondary">Community Contributor</p>
            <p className="text-sm text-secondary">Joined {profileData.joinedYear}</p>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mb-6">
          <h3 className="text-lg font-bold mb-3">My Impact</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-white p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-primary" style={{fontSize: '2rem'}}>edit_document</span>
              </div>
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-xs text-secondary">Reports Filed</p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-green-600" style={{fontSize: '2rem'}}>check_circle</span>
              </div>
              <p className="text-2xl font-bold text-green-600">8</p>
              <p className="text-xs text-secondary">Issues Resolved</p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-orange-500" style={{fontSize: '2rem'}}>stars</span>
              </div>
              <p className="text-2xl font-bold text-orange-500">245</p>
              <p className="text-xs text-secondary">Points Earned</p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-purple-600" style={{fontSize: '2rem'}}>workspace_premium</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">#15</p>
              <p className="text-xs text-secondary">Ranking</p>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="mb-6">
          <h3 className="text-lg font-bold mb-3">Achievements</h3>
          <div className="rounded-lg bg-white p-4 space-y-3">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-yellow-50">
              <span className="material-symbols-outlined text-yellow-600" style={{fontSize: '2.5rem', fontVariationSettings: "'FILL' 1"}}>
                emoji_events
              </span>
              <div className="flex-1">
                <p className="font-bold text-sm">First Reporter</p>
                <p className="text-xs text-secondary">Filed your first civic report</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-blue-50">
              <span className="material-symbols-outlined text-blue-600" style={{fontSize: '2.5rem', fontVariationSettings: "'FILL' 1"}}>
                verified
              </span>
              <div className="flex-1">
                <p className="font-bold text-sm">Problem Solver</p>
                <p className="text-xs text-secondary">Helped resolve 5 community issues</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-green-50">
              <span className="material-symbols-outlined text-green-600" style={{fontSize: '2.5rem', fontVariationSettings: "'FILL' 1"}}>
                local_fire_department
              </span>
              <div className="flex-1">
                <p className="font-bold text-sm">Weekly Streak</p>
                <p className="text-xs text-secondary">Active 7 days in a row</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mb-6">
          <h3 className="text-lg font-bold mb-3">Recent Activity</h3>
          <div className="rounded-lg bg-white p-4 space-y-3">
            <div className="flex items-start gap-3 pb-3 border-b border-gray">
              <span className="material-symbols-outlined text-green-600">check_circle</span>
              <div className="flex-1">
                <p className="text-sm font-medium">Your report was resolved</p>
                <p className="text-xs text-secondary">Pothole on Main Street - 2 days ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-3 border-b border-gray">
              <span className="material-symbols-outlined text-blue-600">edit_document</span>
              <div className="flex-1">
                <p className="text-sm font-medium">New report filed</p>
                <p className="text-xs text-secondary">Street light outage - 5 days ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-orange-500">stars</span>
              <div className="flex-1">
                <p className="text-sm font-medium">Earned 50 points</p>
                <p className="text-xs text-secondary">Report helped 23 people - 1 week ago</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-lg bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Profile visibility</h3>
                <p className="text-sm text-secondary">
                  {profileData.profileVisible ? 'Visible to everyone' : 'Only visible to you'}
                </p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={profileData.profileVisible}
                  onChange={toggleVisibility}
                />
                <span className="toggle-bg"></span>
                <span className="toggle-dot"></span>
              </label>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4">
            <h3 className="mb-4 text-lg font-bold">Personal details</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">Phone</p>
                  {editingField === 'phone' ? (
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="tel"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="form-input flex-1"
                        style={{padding: '0.5rem', fontSize: '0.875rem'}}
                        autoFocus
                      />
                      <button 
                        onClick={() => saveEdit('phone')} 
                        className="p-2 rounded-lg hover:bg-green-50 transition-colors"
                        style={{color: '#22c55e'}}
                        title="Save"
                      >
                        <span className="material-symbols-outlined">check</span>
                      </button>
                      <button 
                        onClick={cancelEdit} 
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                        style={{color: '#ef4444'}}
                        title="Cancel"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-secondary">{profileData.phone}</p>
                  )}
                </div>
                {editingField !== 'phone' && (
                  <button className="edit-btn" onClick={() => startEdit('phone', profileData.phone)}>
                    <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20">
                      <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
                    </svg>
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">Email</p>
                  {editingField === 'email' ? (
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="email"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="form-input flex-1"
                        style={{padding: '0.5rem', fontSize: '0.875rem'}}
                        autoFocus
                      />
                      <button 
                        onClick={() => saveEdit('email')} 
                        className="p-2 rounded-lg hover:bg-green-50 transition-colors"
                        style={{color: '#22c55e'}}
                        title="Save"
                      >
                        <span className="material-symbols-outlined">check</span>
                      </button>
                      <button 
                        onClick={cancelEdit} 
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                        style={{color: '#ef4444'}}
                        title="Cancel"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-secondary">{profileData.email}</p>
                  )}
                </div>
                {editingField !== 'email' && (
                  <button className="edit-btn" onClick={() => startEdit('email', profileData.email)}>
                    <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20">
                      <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
                    </svg>
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Aadhar</p>
                  <p className="text-sm text-secondary">{profileData.aadhar}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4">
            <h3 className="mb-4 text-lg font-bold">Location Settings</h3>
            <p className="text-sm text-secondary mb-3">Set your default location for reporting incidents</p>
            <div style={{padding: '0.75rem 1rem', background: 'var(--background-light)', borderRadius: '0.5rem', border: '1px solid var(--border-light)', marginBottom: '1rem'}}>
              <p className="font-medium">{profileData.defaultLocation}</p>
            </div>
            <button 
              onClick={getLocation}
              disabled={isGettingLocation}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: isGettingLocation ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontWeight: 600,
                opacity: isGettingLocation ? 0.7 : 1
              }}
            >
              <span className="material-symbols-outlined">my_location</span>
              {isGettingLocation ? 'Getting Location...' : 'Get Location'}
            </button>
            <p className="text-xs text-secondary mt-2">Note: You'll still need to detect location each time you report an incident for accuracy.</p>
          </div>

          <div className="rounded-lg bg-white p-4">
            <h3 className="mb-4 text-lg font-bold">Language Settings</h3>
            <p className="text-sm text-secondary mb-3">Choose your preferred language</p>
            <select 
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                localStorage.setItem('appLanguage', e.target.value);
                showNotification(`Language changed to ${e.target.value}`, 'success');
              }}
              className="form-input"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-light)',
                background: 'white',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              <option value="English">English</option>
              <option value="हिंदी">हिंदी (Hindi)</option>
              <option value="తెలుగు">తెలుగు (Telugu)</option>
              <option value="தமிழ்">தமிழ் (Tamil)</option>
              <option value="বাংলা">বাংলা (Bengali)</option>
              <option value="मराठी">मराठी (Marathi)</option>
              <option value="ગુજરાતી">ગુજરાતી (Gujarati)</option>
              <option value="ಕನ್ನಡ">ಕನ್ನಡ (Kannada)</option>
              <option value="മലയാളം">മലയാളം (Malayalam)</option>
              <option value="ਪੰਜਾਬੀ">ਪੰਜਾਬੀ (Punjabi)</option>
            </select>
            <p className="text-xs text-secondary mt-2">Language preference will be saved across sessions</p>
          </div>

          <div className="rounded-lg bg-white p-4">
            <h3 className="mb-4 text-lg font-bold">Saved posts</h3>
            <div className="flex items-center gap-4">
              <div 
                className="saved-post-img"
                style={{backgroundImage: 'url(https://cdn.usegalileo.ai/stability/22d18033-44a1-430f-931f-1a83d0ad21e5.png)'}}
              />
              <div className="flex-1 space-y-1">
                <p className="text-sm text-secondary">Saved</p>
                <p className="font-bold">Incident reported</p>
                <p className="text-sm text-secondary">Status: In progress</p>
              </div>
            </div>
          </div>
        </section>
      </main>

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

export default Profile;
