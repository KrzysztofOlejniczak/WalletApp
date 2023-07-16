const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Transactions
 *     description: Endpoints related to transactions
 */

router.get("/", async (req, res, next) => {
  res.json({ message: "template test message" });
});

module.exports = router;
