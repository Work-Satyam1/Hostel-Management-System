const mongoose = require("mongoose");

const roomAllocationSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
            unique: true
        },

        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true
        },

        allocatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        allocationDate: {
            type: Date,
            default: Date.now
        },

        status: {
            type: String,
            enum: ["active", "vacated"],
            default: "active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "RoomAllocation",
    roomAllocationSchema
);