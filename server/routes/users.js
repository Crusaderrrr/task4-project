const express = require('express');
const router = express.Router();
const pool = require('../database/db');

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, email, last_login, status FROM users ORDER BY last_login DESC NULLS LAST'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/block', async (req, res) => {
  const { userIds } = req.body;
  try {
    await pool.query(
      'UPDATE users SET status = $1 WHERE id = ANY($2)',
      ['blocked', userIds]
    );
    res.json({ message: 'Users blocked successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to block users' });
  }
});

router.post('/unblock', async (req, res) => {
  const { userIds } = req.body;
  try {
    await pool.query(
      'UPDATE users SET status = $1 WHERE id = ANY($2)',
      ['active', userIds]
    );
    res.json({ message: 'Users unblocked successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to unblock users' });
  }
});

router.delete('/', async (req, res) => {
  const { userIds } = req.body;
  try {
    await pool.query('DELETE FROM users WHERE id = ANY($1)', [userIds]);
    res.json({ message: 'Users deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete users' });
  }
});

module.exports = router;