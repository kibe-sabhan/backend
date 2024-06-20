// routes/notes.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

// MySQL connection
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Endpoint to create a new note
router.post('/create', (req, res) => {
  const { title, datetime, note } = req.body;

  // Insert new note into database
  const sql = 'INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)';
  db.query(sql, [title, datetime, note], (err, result) => {
    if (err) {
      console.error('Error creating new note:', err);
      res.status(500).json({ error: 'Failed to create new note' });
    } else {
      console.log('New note created successfully');
      res.status(201).json({ message: 'New note created successfully' });
    }
  });
});

module.exports = router;
