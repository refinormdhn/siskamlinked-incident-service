const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const serverUrl = process.env.SWAGGER_SERVER_URL || 'http://localhost:3021';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SiskamLinked Incident Service API',
            version: '1.0.0',
            description: 'API Documentation untuk Microservice Incident Response. Service ini menangani pelaporan insiden dan penugasan petugas.',
        },
        servers: [
            {
                url: serverUrl,
                description: 'API Server'
            },
            {
                url: 'https://18223070.tesatepadang.space',
                description: 'Production Server'
            }
        ],
        components: {
            schemas: {
                Incident: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        reporter_name: { type: 'string', example: 'Ibu Ani' },
                        location: { type: 'string', example: 'Jl. Mawar No. 4' },
                        incident_type: { type: 'string', example: 'Theft' },
                        description: { type: 'string', example: 'Orang mencurigakan loncat pagar' },
                        status: { type: 'string', enum: ['OPEN', 'ASSIGNED', 'RESOLVED'], example: 'OPEN' },
                        assigned_officer_id: { type: 'integer', example: null },
                        assigned_officer_name: { type: 'string', example: null },
                        created_at: { type: 'string', format: 'date-time' }
                    }
                },
                IncidentInput: {
                    type: 'object',
                    required: ['reporter_name', 'location', 'incident_type', 'description'],
                    properties: {
                        reporter_name: { type: 'string', example: 'Ibu Ani' },
                        location: { type: 'string', example: 'Jl. Mawar No. 4' },
                        incident_type: { type: 'string', example: 'Theft' },
                        description: { type: 'string', example: 'Orang mencurigakan loncat pagar' },
                        officer_id: { type: 'integer', description: 'Opsional (jika langsung assign)', example: 99 },
                        officer_name: { type: 'string', description: 'Opsional', example: 'Pak Budi' }
                    }
                },
                UpdateIncidentInput: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', enum: ['ASSIGNED', 'RESOLVED'], example: 'ASSIGNED' },
                        officer_id: { type: 'integer', example: 99 },
                        officer_name: { type: 'string', example: 'Pak Budi' }
                    }
                }
            }
        }
    },
    apis: [
        path.join(__dirname, '../docs/*.js'), 
        path.join(__dirname, '../routes/*.js')
    ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;