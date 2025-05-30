const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'user_management_db',
  password: '12345678',
  port: 5432,
});

// Function to initialize the database
const initializeDatabase = async () => {
  try {
    // Create table and index
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        last_login TIMESTAMP,
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE UNIQUE INDEX IF NOT EXISTS idx_email ON users(email);
    `);
    console.log('Database initialized successfully');

    // Test connection
    const res = await pool.query('SELECT NOW()');
    console.log('Connected at:', res.rows[0]);
  } catch (err) {
    console.error('DB setup or connection error:', err.stack);
    throw err; // Re-throw to handle in the main file if needed
  }
};

// Initialize the database when the module is loaded
initializeDatabase().catch(err => console.error('Failed to initialize database:', err.stack));

module.exports = pool;