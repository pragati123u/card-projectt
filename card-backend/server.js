const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2'); 
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: 'Pragati@123',      
    database: 'cardInfo'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Get all jobs
app.get('/jobs', (req, res) => {
    db.query('SELECT * FROM jobs ORDER BY created_at DESC', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add new job
app.post('/jobs', (req, res) => {
    const { company, role, type, level, pay, location } = req.body;
    const sql = 'INSERT INTO jobs (company, role, type, level, pay, location) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [company, role, type, level, pay, location], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...req.body });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
