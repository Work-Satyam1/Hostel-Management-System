const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createStudentProfile,
    getMyRoom
} = require("../controllers/studentController");


// CREATE STUDENT PROFILE
router.post(
    "/profile",
    authMiddleware,
    createStudentProfile
);


// GET MY ROOM
router.get(
    "/my-room",
    authMiddleware,
    getMyRoom
);


module.exports = router;