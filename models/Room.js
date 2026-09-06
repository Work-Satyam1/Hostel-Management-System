const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {
        hostel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hostel",
            required: true
        },

        roomNumber: {
            type: String,
            required: true,
            trim: true
        },

        floor: {
            type: Number,
            required: true
        },

        capacity: {
            type: Number,
            required: true,
            min: 1
        },

        occupied: {
            type: Number,
            default: 0,
            min: 0
        },

        status: {
            type: String,
            enum: ["available", "full", "maintenance"],
            default: "available"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Room", roomSchema);