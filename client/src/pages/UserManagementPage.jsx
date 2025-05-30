import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserTable from '../components/UserTable';
import { AuthContext } from '../context/AuthContext';

function UserManagementPage() {
  const { user, isBlocked } = useContext(AuthContext);

  if (!user) return <Navigate to='/login'/>;
  if (isBlocked) return <Navigate to="/login" />;

  return (
    <div>
      <h1 className="text-center mt-4 display-3">User Management</h1>
      <UserTable />
    </div>
  );
}

export default UserManagementPage;