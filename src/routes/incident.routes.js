const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incident.controller');

router.post('/', incidentController.reportIncident);
router.get('/', incidentController.getAllIncidents);
router.put('/:id', incidentController.updateIncident); 

module.exports = router;