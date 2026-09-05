const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createStudentProfile
} = require("../controllers/studentController");

router.post(
    "/profile",
    authMiddleware,
    createStudentProfile
);

module.exports = router;