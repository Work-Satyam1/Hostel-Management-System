const Student = require("../models/Student");

const createStudentProfile = async (req, res) => {
    try {
        const {
            studentId,
            phone,
            course,
            semester,
            emergencyContact
        } = req.body;

        if (!studentId || !phone || !course || !semester) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        const existingStudent = await Student.findOne({
            $or: [
                { user: req.user.userId },
                { studentId: studentId }
            ]
        });

        if (existingStudent) {
            return res.status(400).json({
                message: "Student profile already exists"
            });
        }

        const student = await Student.create({
            user: req.user.userId,
            studentId,
            phone,
            course,
            semester,
            emergencyContact
        });

        res.status(201).json({
            message: "Student profile created successfully",
            student
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    createStudentProfile
};