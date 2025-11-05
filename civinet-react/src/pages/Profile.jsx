import { useState } from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: 'Dravid',
    phone: '+91 9876543210',
    email: 'ethan.carter@email.com',
    aadhar: 'XXXX XXX 123',
    joinedYear: '2021',
    profileVisible: true,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7bWPSjarPI3FB4VGma7TBRV0CmPhPYkJViKaGEAy6ik8biv5IWfi_Hj7tQvDNGnhXS6s3JX-NlpG4EUFmwrRPOaK931I-NA3BOU6fIyOkOAOfVT9caBNGCubQkFPePFobJOjJw2_RSGbcyTO9KgpEsNBrfM70Pou6Va281zpG2QSAFUcoH7b6vFEg9m27hNYFH-dMFdRQbfhRPCusCt2l2kpaGCBLam9owDV_vozZiUy5FqDA8-vZDlYmIA-I1o4V62wmCeMo8OFJ'
  });

  const toggleVisibility = (e) => {
    setProfileData({...profileData, profileVisible: e.target.checked});
  };

  return (
    <div className="flex flex-col min-h-screen has-bottom-nav">
      <header className="header-sticky flex items-center justify-between px-4 py-3">
        <Link to="/feed" style={{display: 'flex', alignItems: 'center', width: '2.5rem', height: '2.5rem'}}>
          <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
        </Link>
        <h1 className="text-lg font-bold">Profile</h1>
        <div style={{width: '2.5rem'}}></div>
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
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-secondary">{profileData.phone}</p>
                </div>
                <button className="edit-btn">
                  <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20">
                    <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
                  </svg>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-secondary">{profileData.email}</p>
                </div>
                <button className="edit-btn">
                  <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20">
                    <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
                  </svg>
                </button>
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
            <div style={{padding: '0.75rem 1rem', background: 'var(--background-light)', borderRadius: '0.5rem', border: '1px solid var(--border-light)'}}>
              <p className="font-medium">San Francisco, CA</p>
            </div>
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
  );
};

export default Profile;
