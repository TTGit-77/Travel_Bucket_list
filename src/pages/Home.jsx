import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../config';
import './Home.css';

const Home = ({ setAuth }) => {
  const [places, setPlaces] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newPlace, setNewPlace] = useState({
    place: '',
    description: '',
    photo: ''
  });
  const [imageType, setImageType] = useState('url'); // 'url' or 'file'
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  const fetchPlaces = async () => {
    try {
      const data = await apiCall('/api/places', {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      setPlaces(data);
    } catch (err) {
      console.error('Error fetching places:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setAuth(false);
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setShowDropdown(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddPlace = async (e) => {
    e.preventDefault();
    
    let photoUrl = newPlace.photo;
    
    // If file is selected, convert to base64
    if (imageType === 'file' && selectedFile) {
      photoUrl = imagePreview;
    }

    try {
      const addedPlace = await apiCall('/api/places', {
        method: 'POST',
        headers: {
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
          place: newPlace.place,
          description: newPlace.description,
          photo: photoUrl
        })
      });
      
      setPlaces([...places, addedPlace]);
      setNewPlace({ place: '', description: '', photo: '' });
      setSelectedFile(null);
      setImagePreview('');
      setImageType('url');
      setShowAddForm(false);
    } catch (err) {
      console.error('Error adding place:', err);
      alert('Failed to add place. Please try again.');
    }
  };

  const handleDeletePlace = async (placeId) => {
    if (!placeId || !places.find(p => p._id === placeId)?.userAdded) return;
    
    try {
      await apiCall(`/api/places/${placeId}`, {
        method: 'DELETE',
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      
      setPlaces(places.filter(p => p._id !== placeId));
    } catch (err) {
      console.error('Error deleting place:', err);
      alert('Failed to delete place. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading">Loading places...</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="profile-dropdown">
        <button 
          className="profile-btn" 
          onClick={() => setShowDropdown(!showDropdown)}
        >
          👤
        </button>
        {showDropdown && (
          <div className="dropdown-menu">
            <button onClick={handleProfileClick}>My Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      <h1>Suggested Places to Visit</h1>
      
      <div className="places-grid">
        {places.map((place, idx) => (
          <div className="place-card" key={place._id || idx}>
            <img src={place.photo} alt={place.place} />
            <h2>{place.place}</h2>
            <p>{place.description}</p>
            {place.userAdded && (
              <div className="user-added-controls">
                <span className="user-added-badge">Added by you</span>
                <button 
                  className="delete-btn"
                  onClick={() => handleDeletePlace(place._id)}
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
        ))}
        
        <div className="add-place-card" onClick={() => setShowAddForm(true)}>
          <div className="add-place-content">
            <div className="add-icon">+</div>
            <h3>Add New Place</h3>
            <p>Share your favorite destination</p>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Place</h2>
            <form onSubmit={handleAddPlace}>
              <input
                type="text"
                placeholder="Place name"
                value={newPlace.place}
                onChange={(e) => setNewPlace({...newPlace, place: e.target.value})}
                required
              />
              <textarea
                placeholder="Description"
                value={newPlace.description}
                onChange={(e) => setNewPlace({...newPlace, description: e.target.value})}
                required
              />
              
              <div className="image-input-section">
                <div className="image-type-toggle">
                  <button
                    type="button"
                    className={imageType === 'url' ? 'active' : ''}
                    onClick={() => setImageType('url')}
                  >
                    Image URL
                  </button>
                  <button
                    type="button"
                    className={imageType === 'file' ? 'active' : ''}
                    onClick={() => setImageType('file')}
                  >
                    Upload Image
                  </button>
                </div>
                
                {imageType === 'url' ? (
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={newPlace.photo}
                    onChange={(e) => setNewPlace({...newPlace, photo: e.target.value})}
                    required
                  />
                ) : (
                  <div className="file-upload-section">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                    />
                    {imagePreview && (
                      <div className="image-preview">
                        <img src={imagePreview} alt="Preview" />
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="modal-buttons">
                <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
                <button type="submit">Add Place</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 