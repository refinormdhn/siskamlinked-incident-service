# SiskamLinked Patrol Service

Microservice untuk sistem manajemen patroli keamanan. Service ini menangani manajemen petugas keamanan, absensi, dan penjadwalan patroli.

## Daftar Isi

- [Fitur](#fitur)
- [Tech Stack](#tech-stack)
- [Instalasi](#instalasi)
- [Konfigurasi](#konfigurasi)
- [Menjalankan Service](#menjalankan-service)
- [API Documentation](#api-documentation)
- [Swagger UI](#swagger-ui)
- [Testing](#testing)
- [Docker Deployment](#docker-deployment)

## Fitur

- **Authentication** - Register, Login dengan JWT Token
- **Officer Management** - CRUD data petugas keamanan
- **Attendance System** - Check-in/Check-out petugas
- **Schedule Management** - Penjadwalan shift patroli
- **Health Check** - Endpoint monitoring service
- **Swagger UI** - Interactive API documentation
- **Schedule Management** - Penjadwalan shift patroli
- **Health Check** - Endpoint monitoring service

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Node.js | 20.x | JavaScript Runtime |
| Express.js | 5.x | Web Framework |
| SQLite3 | 5.x | Database |
| JWT | 9.x | Authentication |
| bcryptjs | 3.x | Password Hashing |
| Docker | - | Containerization |

## Instalasi

### Prerequisites

- Node.js >= 18.x
- npm atau yarn
- Docker (opsional, untuk deployment)

### Clone Repository

```bash
git clone https://github.com/NazwanSM/siskamlinked-patrol-service.git
cd siskamlinked-patrol-service
```

### Install Dependencies

```bash
npm install
```

## Konfigurasi

Buat file `.env` di root directory:

```env
# Server
PORT=3021
NODE_ENV=development

# Database (Otomatis dibuat oleh SQLite)
# DB_PATH=./incident.db

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Port server | `3021` |
| `NODE_ENV` | Environment Mode | `development` |

## Menjalankan Service

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Service akan berjalan di `http://localhost:3021`

## Swagger UI

Swagger UI tersedia untuk dokumentasi API interaktif.

### Akses Swagger UI

Setelah service berjalan, buka browser dan akses:

```
http://localhost:3021/api-docs
```

### Swagger JSON

Untuk mendapatkan spesifikasi OpenAPI dalam format JSON:

```
http://localhost:3021/api-docs.json
```

### Fitur Swagger UI

- **Try it out** - Test API langsung dari browser
- **Authentication** - Masukkan JWT token untuk test endpoint yang memerlukan autentikasi
- **Request/Response Examples** - Contoh request body dan response
- **Schema Definitions** - Definisi struktur data

## API Documentation

### Base URL

```
http://localhost:3021
```

### Incident Endpoints

#### Create New Incident (Lapor Warga)

```http
POST /incidents
```

**Request Body:**
```json
{
  "reporter_name": "Ibu Ani",
  "location": "Blok A No. 12",
  "incident_type": "Theft",
  "description": "Ada orang mencurigakan loncat pagar"
}
```

**Response(201 Created):**
```json
{
  "success": true,
  "message": "Laporan berhasil dibuat",
  "data": {
    "id": 1,
    "reporter_name": "Ibu Ani",
    "status": "OPEN",
    "created_at": "2026-01-04T10:00:00.000Z"
    ...
  }
}
```

#### Get All Incidents

```http
GET /incidents
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "reporter_name": "Ibu Ani",
      "location": "Blok A No. 12",
      "incident_type": "Theft",
      "status": "OPEN",
      "assigned_officer_name": null,
      "created_at": "2026-01-04T10:00:00.000Z"
    }
  ]
}
```

#### Update Incident/Assign Officer

```http
PUT /incidents/:id
```
**Request Body:**
```
{
  "status": "ASSIGNED",
  "officer_id": 99,
  "officer_name": "Pak Budi"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Data insiden berhasil diperbarui",
  "data": {
    "id": 1,
    "status": "ASSIGNED",
    "assigned_officer_id": 99,
    "assigned_officer_name": "Pak Budi"
  }
}
```

---

### System Endpoints

#### Health Check

```http
GET /health
```

**Response:**
```
{
  "status": "Incident Service OK"
}
```

## Testing

### Menggunakan cURL

```bash
# Health Check
curl http://localhost:3021/health

# Membuat Laporan (Create)
curl -X POST http://localhost:3021/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "reporter_name": "Warga 01",
    "location": "Pos Ronda Utara",
    "incident_type": "Fire",
    "description": "Kebakaran tempat sampah"
}'

# Lihat Data (Read)
curl http://localhost:3021/incidents

# Assign Petugas (Update)
curl -X PUT http://localhost:3021/incidents/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "ASSIGNED",
    "officer_id": 5,
    "officer_name": "Budi Santoso"
}'
```

## Docker Deployment

### Build dan Run dengan Docker Compose

```bash
# Build image & Run container
docker compose up -d --build

# Lihat logs
docker logs -f incident-service

# Stop container
docker compose down
```

### Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3021

CMD ["node", "server.js"]
```

### docker-compose.yml

```yaml
services:
  incident-service:
    build: .
    container_name: incident-service
    env_file:
      - .env
    ports:
      - "3021:3021"
    volumes:
      - ./incident.db:/app/incident.db
    restart: unless-stopped
```

---

## Struktur Project

```
siskamlinked-incident-service/
├── src/
│   ├── config/
│   │   ├── database.js        # SQLite connection
│   │   └── swagger.js         # OpenAPI Configuration
│   ├── controllers/
│   │   └── incident.controller.js # Business Logic
│   ├── models/
│   │   └── incident.model.js  # Database Queries
│   └── routes/
│       └── incident.routes.js # API Routes
├── server.js                  # Entry point
├── incident.db                # SQLite Database file
├── package.json
├── Dockerfile
├── docker-compose.yml
├── .env
├── .dockerignore
├── .gitignore
└── README.md
```

---

## Status Codes

| Code | Description |
|------|-------------|
| `200` | Success/OK |
| `201` | Created |
| `400` | Bad Request |
| `404` | Not Found |
| `500` | Internal Server Error |

---
