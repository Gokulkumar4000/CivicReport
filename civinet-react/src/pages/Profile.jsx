import { useState } from 'react';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Sidebar';
import MenuButton from '../components/MenuButton';
import { useSidebar } from '../contexts/SidebarContext';

const Profile = () => {
  const { isOpen } = useSidebar();
  const [profileData, setProfileData] = useState({
    name: 'Dravid',
    phone: '+91 9876543210',
    email: 'ethan.carter@email.com',
    aadhar: 'XXXX XXX 123',
    joinedYear: '2021',
    profileVisible: true,
    defaultLocation: 'San Francisco, CA',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7bWPSjarPI3FB4VGma7TBRV0CmPhPYkJViKaGEAy6ik8biv5IWfi_Hj7tQvDNGnhXS6s3JX-NlpG4EUFmwrRPOaK931I-NA3BOU6fIyOkOAOfVT9caBNGCubQkFPePFobJOjJw2_RSGbcyTO9KgpEsNBrfM70Pou6Va281zpG2QSAFUcoH7b6vFEg9m27hNYFH-dMFdRQbfhRPCusCt2l2kpaGCBLam9owDV_vozZiUy5FqDA8-vZDlYmIA-I1o4V62wmCeMo8OFJ'
  });
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

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

  const getLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Format coordinates correctly based on sign
          const latDir = latitude >= 0 ? 'N' : 'S';
          const lonDir = longitude >= 0 ? 'E' : 'W';
          const location = `${Math.abs(latitude).toFixed(4)}°${latDir}, ${Math.abs(longitude).toFixed(4)}°${lonDir}`;
          setProfileData(prev => ({...prev, defaultLocation: location}));
          setIsGettingLocation(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setIsGettingLocation(false);
        }
      );
    } else {
      console.error('Geolocation not supported');
      setIsGettingLocation(false);
    }
  };

  return (
    <>
      <Sidebar />
      <MenuButton />
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
            <p className="text-secondary">View profile</p>
            <p className="text-sm text-secondary">Joined {profileData.joinedYear}</p>
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
                      <button onClick={() => saveEdit('phone')} className="btn-primary" style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}}>
                        Save
                      </button>
                      <button onClick={cancelEdit} className="btn-secondary" style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}}>
                        Cancel
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
                      <button onClick={() => saveEdit('email')} className="btn-primary" style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}}>
                        Save
                      </button>
                      <button onClick={cancelEdit} className="btn-secondary" style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}}>
                        Cancel
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
    </>
  );
};

export default Profile;
