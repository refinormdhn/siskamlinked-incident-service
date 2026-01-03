const Incident = require('../models/incident.model');

exports.reportIncident = (req, res) => {
    const { reporter_name, location, incident_type, description, officer_id, officer_name } = req.body;

    const incidentData = {
        reporter_name,
        location,
        incident_type,
        description,
        status: officer_id ? 'ASSIGNED' : 'OPEN',
        assigned_officer_id: officer_id || null,
        assigned_officer_name: officer_name || null
    };

    Incident.create(incidentData, (err, incidentId) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }

        res.status(201).json({
            success: true,
            message: 'Laporan berhasil dibuat',
            data: {
                id: incidentId,
                ...incidentData
            }
        });
    });
};

exports.getAllIncidents = (req, res) => {
    Incident.getAll((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, data: rows });
    });
};

exports.updateIncident = (req, res) => {
    const { id } = req.params;
    const { status, officer_id, officer_name } = req.body;

    const updateData = {
        status: status || 'ASSIGNED',
        assigned_officer_id: officer_id,
        assigned_officer_name: officer_name
    };

    Incident.update(id, updateData, (err, changes) => {
        if (err) return res.status(500).json({ success: false, error: err.message });
        if (changes === 0) return res.status(404).json({ success: false, message: 'Insiden tidak ditemukan' });

        res.json({
            success: true,
            message: 'Data insiden berhasil diperbarui',
            data: updateData
        });
    });
};