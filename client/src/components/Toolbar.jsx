import React, { useContext, useEffect, useRef } from 'react';
import { blockUsers, unblockUsers, deleteUsers, fetchUsers } from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Toolbar({ selectedUsers, setStatusMessage, setUsers }) {
  const tooltipInstancesRef = useRef([]);
  const { isBlocked } = useContext(AuthContext); 
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      if (window.bootstrap) {
        tooltipTriggerList.forEach(tooltipTriggerEl => {
          const tooltip = new window.bootstrap.Tooltip(tooltipTriggerEl);
          tooltipInstancesRef.current.push(tooltip); 
        });
      }

      return () => {
        tooltipInstancesRef.current.forEach(tooltip => {
          if (tooltip) {
            tooltip.dispose();
          }
        });
        tooltipInstancesRef.current = [];
      };
    } catch (error) {
      console.error('Error initializing or cleaning up tooltips:', error);
    }
  }, []);

const handleAction = async (action, successMessage) => {
    if (isBlocked) {
      navigate('/login');
      return;
    }
    if (selectedUsers.length === 0) {
      setStatusMessage(`Please select at least one user to ${action.name.toLowerCase()}`);
      return;
    }
    try {
      await action(selectedUsers);
      setStatusMessage(`${successMessage} successfully`);
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
    } catch (err) {
      if (err.response?.status === 403) {
        navigate('/login');
      } else {
        setStatusMessage(`Error ${action.name.toLowerCase()}ing users: ${err.message}`);
      }
    }
  };

  const handleBlock = () => handleAction(blockUsers, 'Users blocked');
  const handleUnblock = () => handleAction(unblockUsers, 'Users unblocked');
  const handleDelete = () => handleAction(deleteUsers, 'Users deleted');

  return (
    <div className="d-flex justify-content-between mb-3">
      <button
        className="btn btn-primary"
        onClick={handleBlock}
        data-bs-toggle="tooltip"
        title="Block selected users"
      >
        Block
      </button>
      <div>
        <button
          className="btn btn-outline-success me-2"
          onClick={handleUnblock}
          data-bs-toggle="tooltip"
          title="Unblock selected users"
        >
          <i className="bi bi-unlock"></i>
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={handleDelete}
          data-bs-toggle="tooltip"
          title="Delete selected users"
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default Toolbar;