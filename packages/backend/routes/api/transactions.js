const express = require('express');
const ctrlTransaction = require('../../controller/transactions');
const auth = require('../../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Transactions
 *     description: Endpoints related to transactions
 */

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     tags:
 *       - Transactions
 *     summary: Add transaction to database
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: JWT token in format 'Bearer [token]'
 *         required: true
 *         schema:
 *           type: string
 *           default: Bearer [token]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isExpense:
 *                 type: Boolean
 *                 description: Is transaction is expense?
 *               amount:
 *                 type: Number
 *                 description: Amount of transaction
 *               date:
 *                 type: Date
 *                 description: Date of transaction
 *               comment:
 *                 type: String
 *                 description: comment
 *               category:
 *                 type: String
 *                 description: category of transaction
 *                 default: Income
 *             example:
 *               isExpense: true
 *               amount: 250
 *               date: 2023-07-01
 *               comment: Fuel
 *               category: Car
 *       required: true
 *     responses:
 *        '201':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  transaction:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: String
 *                        description: ID of transaction
 *                      isExpense:
 *                        type: Boolean
 *                        description: Is transaction is expense?
 *                      amount:
 *                        type: Number
 *                        description: Amount of transaction
 *                      date:
 *                        type: Date
 *                        description: Date of transaction
 *                      comment:
 *                        type: String
 *                        description: comment
 *                      category:
 *                        type: String
 *                        description: category of transaction
 *                example:
 *                  transaction:
 *                    _id: 64b8ec69e207d66b18d18cd6
 *                    isExpense: true
 *                    amount: 250
 *                    date: 2023-07-01
 *                    comment: Fuel
 *                    category: Car
 *        '401':
 *          description: Not authorized
 *        '500':
 *          description: Internal server error
 */

router.post('/', auth, ctrlTransaction.create);

module.exports = router;
