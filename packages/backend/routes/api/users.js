const express = require('express');
const ctrlUsers = require('../../controller/users');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Endpoints related to user operations
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Pobierz listę użytkowników
 *     description: Pobiera listę wszystkich użytkowników.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Sukces
 *       500:
 *         description: Błąd serwera
 */

router.post('/signup', ctrlUsers.signup);

module.exports = router;
