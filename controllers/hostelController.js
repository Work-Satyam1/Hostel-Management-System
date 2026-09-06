const Hostel = require("../models/Hostel");


// =================================
// CREATE HOSTEL - ADMIN ONLY
// =================================
const createHostel = async (req, res) => {
    try {

        const {
            name,
            location,
            totalRooms
        } = req.body;


        if (!name || !location || !totalRooms) {
            return res.status(400).json({
                message:
                    "Please provide name, location and totalRooms"
            });
        }


        const hostel = await Hostel.create({
            name,
            location,
            totalRooms
        });


        res.status(201).json({
            message: "Hostel created successfully",
            hostel
        });


    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};



// =================================
// GET ALL HOSTELS
// =================================
const getHostels = async (req, res) => {
    try {

        const hostels = await Hostel.find();


        res.status(200).json({
            count: hostels.length,
            hostels
        });


    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};


module.exports = {
    createHostel,
    getHostels
};