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
 * /api/finance/transactions:
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
 *                  _id:
 *                   type: String
 *                   description: ID of transaction
 *                  isExpense:
 *                    type: Boolean
 *                    description: Is transaction is expense?
 *                  amount:
 *                    type: Number
 *                    description: Amount of transaction
 *                  date:
 *                    type: Date
 *                    description: Date of transaction
 *                  comment:
 *                    type: String
 *                    description: comment
 *                  category:
 *                    type: String
 *                    description: category of transaction
 *                example:
 *                  _id: 64b8ec69e207d66b18d18cd6
 *                  isExpense: true
 *                  amount: 250
 *                  date: 2023-07-01
 *                  comment: Fuel
 *                  category: Car
 *        '401':
 *          description: Not authorized
 *        '500':
 *          description: Internal server error
 */

router.post('/transactions', auth, ctrlTransaction.createTransaction);

/**
 * @swagger
 * /api/finance/transactions:
 *   get:
 *     tags:
 *       - Transactions
 *     summary: Get list of user transactions
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: JWT token in format 'Bearer [token]'
 *         required: true
 *         schema:
 *           type: string
 *           default: Bearer [token]
 *       - name: page
 *         in: query
 *         description: number of page
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: number of transactions per page
 *         schema:
 *           type: integer
 *           default: 5
 *     responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: String
 *                      description: ID of transaction
 *                    isExpense:
 *                      type: Boolean
 *                      description: Is transaction is expense?
 *                    amount:
 *                      type: Number
 *                      description: Amount of transaction
 *                    date:
 *                      type: Date
 *                      description: Date of transaction
 *                    comment:
 *                      type: String
 *                      description: comment
 *                    category:
 *                      type: String
 *                      description: category of transaction
 *                example:
 *                  - _id: 64b8ec69e207d66b18d18cd6
 *                    isExpense: true
 *                    amount: 250
 *                    date: 2023-07-01
 *                    comment: Fuel
 *                    category: Car
 *                  - _id: 64b8et69i217d66b18d15ce3
 *                    isExpense: false
 *                    amount: 50
 *                    date: 2023-07-01
 *                    comment: Gift
 *                    category: Income
 *        '401':
 *          description: Not authorized
 *        '500':
 *          description: Internal server error
 */

router.get('/transactions', auth, ctrlTransaction.getTransactions);

/**
 * @swagger
 * /api/finance/transactions/{id}:
 *   delete:
 *     tags:
 *       - Transactions
 *     summary: Delete transaction by id
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: JWT token in format 'Bearer [token]'
 *         required: true
 *         schema:
 *           type: string
 *           default: Bearer [token]
 *       - name: id
 *         in: path
 *         description: ID of transaction to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: String
 *                    description: Message from server
 *                example:
 *                  message: Transaction deleted
 *        '401':
 *          description: Not authorized
 *        '404':
 *          description: Not found
 *        '500':
 *          description: Internal server error
 */

router.delete('/transactions/:id', auth, ctrlTransaction.removeTransaction);

/**
 * @swagger
 * /api/finance/balance:
 *   get:
 *     tags:
 *       - Transactions
 *     summary: Get users balance
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: JWT token in format 'Bearer [token]'
 *         required: true
 *         schema:
 *           type: string
 *           default: Bearer [token]
 *     responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  balance:
 *                    type: Number
 *                    description: Balance uf user
 *                example:
 *                  balance: 1500
 *        '401':
 *          description: Not authorized
 *        '500':
 *          description: Internal server error
 */

router.get('/balance', auth, ctrlTransaction.getBalance);

/**
 * @swagger
 * /api/finance/category:
 *   get:
 *     tags:
 *       - Transactions
 *     summary: Get list of transactions category
 *     responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: Number
 *                      description: id of category
 *                    name:
 *                      type: string
 *                      description: name of category
 *                example:
 *                  - id: 1
 *                    name: Income
 *                  - id: 2
 *                    name: Main expenses
 *        '500':
 *          description: Internal server error
 */

router.get('/categories', ctrlTransaction.getCategoriesList);

module.exports = router;
