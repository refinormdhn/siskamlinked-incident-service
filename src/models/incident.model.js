const db = require('../config/database');

class Incident {
    static create(data, callback) {
        const sql = `INSERT INTO incidents (reporter_name, location, incident_type, description, status, assigned_officer_id, assigned_officer_name) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.run(sql, [
            data.reporter_name,
            data.location,
            data.incident_type,
            data.description,
            'ASSIGNED', 
            data.assigned_officer_id,
            data.assigned_officer_name
        ], function(err) {
            callback(err, this ? this.lastID : null);
        });
    }

    static getAll(callback) {
        db.all("SELECT * FROM incidents ORDER BY created_at DESC", [], callback);
    }

    static update(id, data, callback) {
        const sql = `UPDATE incidents 
                     SET status = ?, assigned_officer_id = ?, assigned_officer_name = ? 
                     WHERE id = ?`;
        db.run(sql, [data.status, data.assigned_officer_id, data.assigned_officer_name, id], function(err) {
            callback(err, this.changes);
        });
    }
}

module.exports = Incident;