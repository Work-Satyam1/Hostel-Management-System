const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        location: {
            type: String,
            required: true
        },

        totalRooms: {
            type: Number,
            required: true,
            min: 1
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Hostel", hostelSchema);