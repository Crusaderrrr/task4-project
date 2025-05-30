const { Pool } = require('pg');

const pool = new Pool({
  user: "avnadmin",
  password: "AVNS_E1IlQTZ6g2QARmmT1NQ",
  host: "task4-db-bulash2006-d3fd.j.aivencloud.com",
  port: 10538,
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: true,
    ca: `-----BEGIN CERTIFICATE-----
MIIEUDCCArigAwIBAgIUJb7HVYcUGEp1XK0tkxcS37b2lZswDQYJKoZIhvcNAQEM
BQAwQDE+MDwGA1UEAww1MThjMDRiNmUtYjc0MS00NjZjLTlkM2QtNmI5YWYxOTM0
M2Y0IEdFTiAxIFByb2plY3QgQ0EwHhcNMjUwNTMwMjAxNDU0WhcNMzUwNTI4MjAx
NDU0WjBAMT4wPAYDVQQDDDUxOGMwNGI2ZS1iNzQxLTQ2NmMtOWQzZC02YjlhZjE5
MzQzZjQgR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
AYoCggGBAK6Zf5EoNipmiDoB2d1orzp3JWK71KFZgQgrhOS1Wjn/OeKyQyXfx+kF
B7u3qwcnYzpviMk5Cn72jELFrZ9+anJjhI2liBDK5eSXsAQoAnsTrfjoylb62pP9
gVWMRQcDC31MXeXq3/knWJo2APhi2fD3kcpvyRA7VGxZuB8k3ygdHnMDY8OUuB5c
Htzj0D2Dl9Bmb8/MRkWBiordK7g2SOriJATgHakClLuhz4YrFMhDVDxP4YsYjBly
L2+sf85wL5xFEn+HH0g3G84c8f2YGipBXAGGHpFyOUXdBQrOtn3FWNug1vCyXDFn
8Z97USqvPFuLYAFPInajil3KKoxxAOeugLoofrHmUwptIxlYesS7xAhrQ4OPmE9A
edwRfyP6kZShL3PyzmmDrnbD34D3ntLXP4x0BFRYL/UejtL48/RVEyhjTmJulJ9K
h/VI+7BiYkl1Hh/HVqxFsxXWN1jJ5/1bgUDrAs/kwRuJW+/qy0745R61CldlCJKR
H35+cQLE4QIDAQABo0IwQDAdBgNVHQ4EFgQUdomqPTRona7nC+k53cZarPjnX0cw
EgYDVR0TAQH/BAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQAD
ggGBAISw0pSrPLCJJOhN2QfHXw1hoSYXF/kLRUWYXFXLsxk48VlM0RqKf+enhgUC
BYRyfe/o4xhuYcSG/XmPLBSQR8cFfY4ks8d2TJfaEQAVX5r4JVsd+udENL+gSmkD
tqBN1iRgdPZTfp7l+fJXl4rOI2ID1yU96zGsNkHbESSvHFVVkd7DV0NRwt9dt5jC
Mu6Ml0P+FX2CiQjveOu+eAENyMvhbrA3GopKfX8KdB9P1JQ/tA47cEGKeL5zkO0R
f8SIeDP84gV1xY6IRvmaMnufguQXVAriNSX4LWRsVdZMG2Bad6ffeD2z2vG2UBlY
G8aLwsd04WUGwlaEL5qmF3iyhQZ52es4MPWUJ1v1+rk4xv0KVB0YZqaauLaGVSbq
qtO+9ZcDxnqrd2OjGRBTANU/iCmuCJow/DwB4A+AJnL8ax1fKIPOUaAc33drIdJF
tTf4U0oquBMi3ahharU7tqsYt/4xa4xGSRcIEATZ3FYIzKWN4+JTo5Udp7hyA4Yy
Yc0Q6Q==
-----END CERTIFICATE-----`,
  },
});

const initializeDatabase = async () => {
  try {
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
    
    const res = await pool.query('SELECT NOW()');
    console.log('Connected at:', res.rows[0]);
  } catch (err) {
    console.error('DB setup or connection error:', err.stack);
    throw err;
  }
};

initializeDatabase().catch(err => console.error('Failed to initialize database:', err.stack));

module.exports = pool;