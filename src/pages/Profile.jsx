import React, { useEffect, useState } from 'react';
import { apiCall } from '../config';
import './Profile.css';

const Profile = () => {
  const [bucketList, setBucketList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    place: '',
    description: '',
    plannedDate: ''
  });
  const username = localStorage.getItem('username');

  const fetchBucketList = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiCall('/api/bucketlist', {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      setBucketList(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBucketList();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const data = await apiCall(`/api/bucketlist/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({ status })
      });
      setBucketList(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const addMilestone = async (e) => {
    e.preventDefault();
    try {
      const data = await apiCall('/api/bucketlist', {
        method: 'POST',
        headers: {
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(newMilestone)
      });
      setBucketList(data);
      setNewMilestone({ place: '', description: '', plannedDate: '' });
      setShowAddForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="profile-container">
      <h1>{username}'s Profile</h1>
      <h2>Travel Milestone</h2>
      
      <button 
        className="add-milestone-btn" 
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? 'Cancel' : '+ Add New Milestone'}
      </button>

      {showAddForm && (
        <form className="milestone-form" onSubmit={addMilestone}>
          <input
            type="text"
            placeholder="Place to visit"
            value={newMilestone.place}
            onChange={(e) => setNewMilestone({...newMilestone, place: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newMilestone.description}
            onChange={(e) => setNewMilestone({...newMilestone, description: e.target.value})}
            required
          />
          <input
            type="date"
            value={newMilestone.plannedDate}
            onChange={(e) => setNewMilestone({...newMilestone, plannedDate: e.target.value})}
            required
          />
          <button type="submit">Add Milestone</button>
        </form>
      )}

      {loading ? <div className="loading">Loading...</div> : error ? <div className="profile-error">{error}</div> : (
        <div className="bucket-list">
          {bucketList.length === 0 ? <p className="no-milestones">No travel milestones yet. Add your first one!</p> : bucketList.map(item => (
            <div className="bucket-item" key={item._id}>
              <div className="bucket-info">
                <h3>{item.place}</h3>
                <p>{item.description}</p>
                <span>Planned: {item.plannedDate}</span>
              </div>
              <button
                className={item.status === 'completed' ? 'completed' : 'pending'}
                onClick={() => updateStatus(item._id, item.status === 'completed' ? 'pending' : 'completed')}
              >
                {item.status === 'completed' ? '✓ Milestone Completed' : '⌛ Milestone Pending'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile; 