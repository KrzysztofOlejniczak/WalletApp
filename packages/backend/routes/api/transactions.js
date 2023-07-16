const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({ message: "template test message" });
});

module.exports = router;
