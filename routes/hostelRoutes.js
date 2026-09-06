const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const adminMiddleware =
    require("../middleware/adminMiddleware");

const {
    createHostel,
    getHostels
} = require("../controllers/hostelController");


// =================================
// CREATE HOSTEL - ADMIN ONLY
// =================================
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createHostel
);


// =================================
// GET HOSTELS - LOGGED IN USERS
// =================================
router.get(
    "/",
    authMiddleware,
    getHostels
);


module.exports = router;