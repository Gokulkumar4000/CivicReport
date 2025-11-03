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

          <div className="rounded-lg bg-white p-4 space-y-4">
            <h3 className="font-bold">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary">Phone</p>
                  <p className="font-medium">{profileData.phone}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary">Email</p>
                  <p className="font-medium">{profileData.email}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary">Aadhar</p>
                  <p className="font-medium">{profileData.aadhar}</p>
                </div>
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
