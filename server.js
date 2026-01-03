require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');

const incidentRoutes = require('./src/routes/incident.routes');

const app = express();
const PORT = process.env.PORT || 3021; 

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/incidents', incidentRoutes);

app.get('/health', (req, res) => res.json({ status: 'Incident Service OK' }));

app.listen(PORT, () => {
    console.log(`Incident Response Service berjalan di port ${PORT}`);
    console.log(`Dokumentasi Swagger tersedia di http://localhost:${PORT}/api-docs`);
});