import React, { useState, useEffect } from 'react';
import Toolbar from './Toolbar';
import { fetchUsers } from '../utils/api';

function UserTable() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setStatusMessage('Error fetching users: ' + err.message);
      }
    };
    loadUsers();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="container mt-5">
      {statusMessage && (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          {statusMessage}
          <button
          type='button'
          className='btn-close'
          onClick={() => setStatusMessage('')}
          aria-label='Close'
          ></button>
        </div>
      )}
      <Toolbar
        selectedUsers={selectedUsers}
        setStatusMessage={setStatusMessage}
        setUsers={setUsers}
      />
      <table className="table table-hover rounded overflow-hidden">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedUsers.length === users.length && users.length > 0}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleSelectUser(user.id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;