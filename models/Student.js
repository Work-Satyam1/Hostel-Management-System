const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        studentId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        phone: {
            type: String,
            required: true
        },

        course: {
            type: String,
            required: true
        },

        semester: {
            type: Number,
            required: true
        },

        emergencyContact: {
            name: {
                type: String
            },
            phone: {
                type: String
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Student", studentSchema);