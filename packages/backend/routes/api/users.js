const express = require("express");
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

router.get("/", async (req, res, next) => {
  res.json({ message: "template test message" });
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template 2test message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
