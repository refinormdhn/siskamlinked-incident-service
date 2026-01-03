require('dotenv').config();
const express = require('express');
const cors = require('cors');
const incidentRoutes = require('./src/routes/incident.routes');

const app = express();
const PORT = process.env.PORT || 3021; 

app.use(cors());
app.use(express.json());

app.use('/incidents', incidentRoutes);

app.get('/health', (req, res) => res.json({ status: 'Incident Service OK' }));

app.listen(PORT, () => {
    console.log(`Incident Response Service berjalan di port ${PORT}`);
});