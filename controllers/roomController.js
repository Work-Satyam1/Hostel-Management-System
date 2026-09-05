const Room = require("../models/Room");
const Hostel = require("../models/Hostel");

const createRoom = async (req, res) => {
    try {
        const {
            hostel,
            roomNumber,
            capacity,
            floor
        } = req.body;

        if (!hostel || !roomNumber || !capacity || floor === undefined) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        const hostelExists = await Hostel.findById(hostel);

        if (!hostelExists) {
            return res.status(404).json({
                message: "Hostel not found"
            });
        }

        const existingRoom = await Room.findOne({
            hostel,
            roomNumber
        });

        if (existingRoom) {
            return res.status(400).json({
                message: "Room already exists in this hostel"
            });
        }

        const room = await Room.create({
            hostel,
            roomNumber,
            capacity,
            floor
        });

        res.status(201).json({
            message: "Room created successfully",
            room
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find()
            .populate("hostel", "name location");

        res.status(200).json({
            count: rooms.length,
            rooms
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createRoom,
    getRooms
};