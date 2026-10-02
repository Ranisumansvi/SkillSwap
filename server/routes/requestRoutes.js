const express = require("express");
const router = express.Router();

const {
    sendRequest,
    getReceivedRequests,
    getSentRequests,
    updateRequest
} = require("../controllers/requestController");

const authenticateToken =
    require("../middleware/authMiddleware");


// ================= PROTECTED ROUTES =================

// Send request
router.post(
    "/send",
    authenticateToken,
    sendRequest
);


// Received requests
router.get(
    "/received/:user_id",
    authenticateToken,
    getReceivedRequests
);


// Sent requests
router.get(
    "/sent/:user_id",
    authenticateToken,
    getSentRequests
);


// Accept / Reject request
router.put(
    "/update/:request_id",
    authenticateToken,
    updateRequest
);


module.exports = router;