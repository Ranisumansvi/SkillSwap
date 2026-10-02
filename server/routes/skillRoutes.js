const express = require("express");
const router = express.Router();

const {
    addUserSkill,
    getUserSkills
} = require("../controllers/skillController");

const authenticateToken = require("../middleware/authMiddleware");


// ================= PROTECTED ROUTES =================

router.post(
    "/add",
    authenticateToken,
    addUserSkill
);

router.get(
    "/user/:user_id",
    authenticateToken,
    getUserSkills
);


module.exports = router;