export const fetchUsers = async () => {
  try {
    const userId = localStorage.getItem('userId');
    const response = await fetch('http://localhost:3001/api/users', {
      headers: {
        'Content-Type': 'application/json',
        'user-id': userId
      }
    });
    if (response.status === 403) {
      localStorage.removeItem('userId');
      window.location.href = '/login';
      throw new Error('User blocked or deleted ')
    }

    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const blockUsers = async (userIds) => {
  try {
    const response = await fetch('http://localhost:3001/api/users/block', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'user-id': localStorage.getItem('userId'),
    },
    body: JSON.stringify({ userIds }),
  });

  if (response.status === 403) {
    window.location.href = 'login';
    throw new Error('User blocked or deleted')
  }

  if (!response.ok) throw new Error('Failed to block users');
  return response.json();
  } catch (err) {
    console.log('Error blocking users:', err);
    throw err;
  }

};

export const unblockUsers = async (userIds) => {
  const response = await fetch('http://localhost:3001/api/users/unblock', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'user-id': localStorage.getItem('userId'),
    },
    body: JSON.stringify({ userIds }),
  });
  if (!response.ok) throw new Error('Failed to unblock users');
  return response.json();
};

export const deleteUsers = async (userIds) => {
  const response = await fetch('http://localhost:3001/api/users/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'user-id': localStorage.getItem('userId'),
    },
    body: JSON.stringify({ userIds }),
  });
  if (!response.ok) throw new Error('Failed to delete users');
  return response.json();
};

export default {
  fetchUsers,
  blockUsers,
  unblockUsers,
  deleteUsers
};