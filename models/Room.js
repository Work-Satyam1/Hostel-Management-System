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

        capacity: {
            type: Number,
            required: true,
            min: 1
        },

        occupiedBeds: {
            type: Number,
            default: 0,
            min: 0
        },

        floor: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: ["available", "full"],
            default: "available"
        }
    },
    {
        timestamps: true
    }
);

// Same room number can exist in different hostels,
// but not twice inside the same hostel.
roomSchema.index(
    { hostel: 1, roomNumber: 1 },
    { unique: true }
);

module.exports = mongoose.model("Room", roomSchema);