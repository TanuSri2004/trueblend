const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

app.post('/api/waitlist', (req, res) => {
  const { name, email, phone } = req.body;
  db.query(
    'INSERT INTO waitlist (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone],
    (err) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: 'Successfully added to waitlist!' });
    }
  );
});
app.get('/api/waitlist', (req, res) => {
  db.query('SELECT name, email, phone, created_at FROM waitlist ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});
