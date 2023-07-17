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
 * /api/users/signup:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: e-mail
 *               password:
 *                 type: string
 *                 description: password
 *               name:
 *                 type: string
 *                 description: name
 *             example:
 *               email: noreply@mail.com
 *               password: UserPassword
 *               name: John
 *       required: true
 *     responses:
 *        '201':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: object
 *                    properties:
 *                      token:
 *                        type: string
 *                        description: JWT token
 *                      user:
 *                        type: object
 *                        properties:
 *                          email:
 *                            type: string
 *                            description: e-mail
 *                          name:
 *                            type: string
 *                            description: name
 *                example:
 *                  data:
 *                    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *                    user:
 *                      email: noreply@mail.com
 *                      name: John
 *        '400':
 *          description: Invalid input
 *        '409':
 *          description: Email in use
 */

router.post('/signup', ctrlUsers.signup);

module.exports = router;
