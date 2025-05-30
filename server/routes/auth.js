const express = require('express');
const router = express.Router();
const pool = require('../database/db');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
  const user = rows[0];
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  if (user.status === 'blocked') return res.status(403).json({ message: 'User is blocked'});
  await pool.query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);
  res.json({ userId: user.id, message: 'Login successful' });
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    res.status(201).json({ message: 'User registered', user: rows[0] });
  } catch (err) {
    if (err.code === '23505') { 
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

module.exports = router;