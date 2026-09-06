const Room = require("../models/Room");
const Hostel = require("../models/Hostel");

// CREATE ROOM - ADMIN ONLY
const createRoom = async (req, res) => {
    try {
        const {
            hostel,
            roomNumber,
            floor,
            capacity
        } = req.body;

        // Check required fields
        if (!hostel || !roomNumber || !floor || !capacity) {
            return res.status(400).json({
                message: "Please provide hostel, roomNumber, floor and capacity"
            });
        }

        // Check whether hostel exists
        const existingHostel = await Hostel.findById(hostel);

        if (!existingHostel) {
            return res.status(404).json({
                message: "Hostel not found"
            });
        }

        // Check duplicate room
        const existingRoom = await Room.findOne({
            hostel,
            roomNumber
        });

        if (existingRoom) {
            return res.status(400).json({
                message: "Room already exists in this hostel"
            });
        }

        // Create room
        const room = await Room.create({
            hostel,
            roomNumber,
            floor,
            capacity,
            occupied: 0,
            status: "available"
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


// GET ALL ROOMS
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


// GET SINGLE ROOM
const getRoomById = async (req, res) => {
    try {

        const room = await Room.findById(req.params.id)
            .populate("hostel", "name location");

        if (!room) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        res.status(200).json({
            room
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
    getRooms,
    getRoomById
};