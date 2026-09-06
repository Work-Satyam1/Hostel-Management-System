const RoomAllocation = require("../models/RoomAllocation");
const Student = require("../models/Student");
const Room = require("../models/Room");


// ALLOCATE ROOM - ADMIN ONLY
const allocateRoom = async (req, res) => {
    try {

        const { student, room } = req.body;

        if (!student || !room) {
            return res.status(400).json({
                message: "Please provide student and room"
            });
        }

        // Check student
        const existingStudent = await Student.findById(student);

        if (!existingStudent) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        // Check room
        const existingRoom = await Room.findById(room);

        if (!existingRoom) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        // Check if room is under maintenance
        if (existingRoom.status === "maintenance") {
            return res.status(400).json({
                message: "Room is under maintenance"
            });
        }

        // Check room capacity
        if (existingRoom.occupied >= existingRoom.capacity) {
            return res.status(400).json({
                message: "Room is already full"
            });
        }

        // Check whether student already has a room
        const existingAllocation = await RoomAllocation.findOne({
            student,
            status: "active"
        });

        if (existingAllocation) {
            return res.status(400).json({
                message: "Student already has a room"
            });
        }

        // Create allocation
        const allocation = await RoomAllocation.create({
            student,
            room,
            allocatedBy: req.user.userId
        });

        // Increase occupied count
        existingRoom.occupied += 1;

        // Update room status
        if (existingRoom.occupied >= existingRoom.capacity) {
            existingRoom.status = "full";
        } else {
            existingRoom.status = "available";
        }

        await existingRoom.save();

        // Return populated allocation
        const populatedAllocation =
            await RoomAllocation.findById(allocation._id)
                .populate("student", "studentId phone course semester")
                .populate("room", "roomNumber floor capacity occupied")
                .populate("allocatedBy", "name email");

        res.status(201).json({
            message: "Room allocated successfully",
            allocation: populatedAllocation
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};


// GET ALL ALLOCATIONS
const getAllocations = async (req, res) => {
    try {

        const allocations = await RoomAllocation.find({
            status: "active"
        })
            .populate("student", "studentId phone course semester")
            .populate("room", "roomNumber floor capacity occupied")
            .populate("allocatedBy", "name email");

        res.status(200).json({
            count: allocations.length,
            allocations
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};


module.exports = {
    allocateRoom,
    getAllocations
};