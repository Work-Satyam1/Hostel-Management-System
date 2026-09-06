const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const adminMiddleware =
    require("../middleware/adminMiddleware");

const {
    createStudent,
    createWarden
} = require("../controllers/adminController");


// CREATE STUDENT
router.post(
    "/students",
    authMiddleware,
    adminMiddleware,
    createStudent
);


// CREATE WARDEN
router.post(
    "/wardens",
    authMiddleware,
    adminMiddleware,
    createWarden
);


module.exports = router;