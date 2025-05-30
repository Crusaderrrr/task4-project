const pool = require('../database/db');

const checkUserStatus = async (req, res, next) => {
  if (['/login', '/register'].includes(req.path)) return next();
  
  const userId = req.headers['user-id'];
  
  if (!userId || userId === 'null' || userId === 'undefined') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [parseInt(userId)]);
    const user = rows[0];
    
    if (!user || user.status === 'blocked') {
      return res.status(403).json({ 
        message: 'User blocked or deleted', 
        redirect: '/login' 
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Error checking user status:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = checkUserStatus;