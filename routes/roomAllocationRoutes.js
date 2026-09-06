const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    allocateRoom,
    getAllocations
} = require("../controllers/roomAllocationController");


// ADMIN ONLY
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    allocateRoom
);


// ADMIN ONLY
router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    getAllocations
);


module.exports = router;