const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    createHostel,
    getHostels
} = require("../controllers/hostelController");


// Only ADMIN can create hostel
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createHostel
);


// Any authenticated user can view hostels
router.get(
    "/",
    authMiddleware,
    getHostels
);


module.exports = router;