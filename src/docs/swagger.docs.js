/**
 * @swagger
 * tags:
 *   - name: Incidents
 *     description: Manajemen pelaporan insiden
 */

/**
 * @swagger
 * /incidents:
 *   post:
 *     summary: Buat Laporan Baru
 *     tags: [Incidents]
 *     description: Membuat laporan insiden baru dari warga.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IncidentInput'
 *     responses:
 *       201:
 *         description: Laporan berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Laporan berhasil dibuat
 *                 data:
 *                   $ref: '#/components/schemas/Incident'
 *       500:
 *         description: Server Error
 *   get:
 *     summary: Ambil Semua Laporan
 *     tags: [Incidents]
 *     description: Mendapatkan daftar semua insiden yang pernah dilaporkan.
 *     responses:
 *       200:
 *         description: Daftar insiden berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Incident'
 */

/**
 * @swagger
 * /incidents/{id}:
 *   put:
 *     summary: Update Insiden (Assign Petugas)
 *     tags: [Incidents]
 *     description: Mengubah status insiden atau menugaskan petugas (digunakan oleh Frontend).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID Insiden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateIncidentInput'
 *     responses:
 *       200:
 *         description: Insiden berhasil diupdate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Data insiden berhasil diperbarui
 *       404:
 *         description: Insiden tidak ditemukan
 */