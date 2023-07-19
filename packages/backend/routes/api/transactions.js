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

router.post('/', auth, ctrlTransaction.create);

module.exports = router;
