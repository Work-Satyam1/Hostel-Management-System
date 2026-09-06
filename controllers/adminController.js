const User = require("../models/User");
const Warden = require("../models/Warden");
const Hostel = require("../models/Hostel");
const bcrypt = require("bcryptjs");


// =================================
// CREATE STUDENT
// ADMIN ONLY
// =================================
const createStudent = async (req, res) => {
    try {

        const {
            name,
            email,
            password
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message:
                    "Please provide name, email and password"
            });
        }

        const existingUser =
            await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message:
                    "User with this email already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const student = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "student"
        });

        res.status(201).json({
            message: "Student created successfully",

            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                role: student.role
            }
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};



// =================================
// CREATE WARDEN
// ADMIN ONLY
// =================================
const createWarden = async (req, res) => {
    try {

        const {
            name,
            email,
            password,
            employeeId,
            phone,
            hostel
        } = req.body;


        // Check required fields
        if (
            !name ||
            !email ||
            !password ||
            !employeeId ||
            !phone ||
            !hostel
        ) {
            return res.status(400).json({
                message:
                    "Please provide name, email, password, employeeId, phone and hostel"
            });
        }


        // Check hostel
        const existingHostel =
            await Hostel.findById(hostel);

        if (!existingHostel) {
            return res.status(404).json({
                message: "Hostel not found"
            });
        }


        // Check existing email
        const existingUser =
            await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message:
                    "User with this email already exists"
            });
        }


        // Check employee ID
        const existingWarden =
            await Warden.findOne({ employeeId });

        if (existingWarden) {
            return res.status(400).json({
                message:
                    "Employee ID already exists"
            });
        }


        // Create password
        const hashedPassword =
            await bcrypt.hash(password, 10);


        // Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "warden"
        });


        // Create Warden profile
        const warden = await Warden.create({
            user: user._id,
            employeeId,
            phone,
            hostel
        });


        // Populate information
        const populatedWarden =
            await Warden.findById(warden._id)
                .populate("user", "name email role")
                .populate("hostel", "name location");


        res.status(201).json({

            message:
                "Warden created successfully",

            warden: populatedWarden
        });


    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};


module.exports = {
    createStudent,
    createWarden
};