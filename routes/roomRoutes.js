const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    createRoom,
    getRooms
} = require("../controllers/roomController");


// Only ADMIN can create rooms
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createRoom
);


// Any authenticated user can view rooms
router.get(
    "/",
    authMiddleware,
    getRooms
);


module.exports = router;