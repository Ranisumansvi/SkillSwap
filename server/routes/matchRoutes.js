const express = require("express");
const router = express.Router();

const { getMatches } = require("../controllers/matchController");

const authenticateToken = require("../middleware/authMiddleware");


// ================= PROTECTED ROUTE =================

router.get(
    "/:user_id",
    authenticateToken,
    getMatches
);


module.exports = router;