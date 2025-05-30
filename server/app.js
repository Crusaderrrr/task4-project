const express = require('express');
const cors = require('cors');
const app = express();
const checkUserStatus = require('./middleware/checkUserStatus');
const auth = require('./routes/auth');
const users = require('./routes/users');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/auth', auth);
app.use('/api/users',checkUserStatus, users);

app.get('/', (req, res) => {
  res.json({ message: 'hello' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));