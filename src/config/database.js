const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.resolve(__dirname, '../../incident.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to Incident SQLite database.');
        
        db.run(`CREATE TABLE IF NOT EXISTS incidents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            reporter_name TEXT NOT NULL,
            location TEXT NOT NULL,
            incident_type TEXT NOT NULL, -- Fire, Theft, Medical
            description TEXT,
            status TEXT DEFAULT 'OPEN', -- OPEN, ASSIGNED, RESOLVED
            assigned_officer_id INTEGER, -- Foreign ID dari Patrol Service
            assigned_officer_name TEXT, -- Snapshot nama petugas saat ditugaskan
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

module.exports = db;