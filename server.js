const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'CocoonApp',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

// Registration Route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO Users (name, email, password_hash) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Email already exists.' });
        }
        return res.status(500).json({ error: 'Database error.' });
      }
      res.status(201).json({ message: 'User registered successfully.' });
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM Users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error.' });
    if (results.length === 0) return res.status(404).json({ error: 'User not found.' });

    const user = results[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
    if (isPasswordMatch) {
      res.status(200).json({ message: 'Login successful.' });
    } else {
      res.status(401).json({ error: 'Invalid password.' });
    }
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
