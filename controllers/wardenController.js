const Warden = require("../models/Warden");
const Room = require("../models/Room");
const RoomAllocation = require("../models/RoomAllocation");

const getMyWardenProfile=async(req,res)=>{
    try{
       const warden=await Warden.findOne({
        user:req.user.userId
       })
       .populate("user","name email role")
       .populate("hostel","name location totalRooms");

       if(!warden){
        return res.status(404)
        .json({
            message:"Warden Profile Not Found"
        })
       }
        res.status(200).json({
            message: "Warden profile fetched successfully",
            warden
        });
    }
    catch(error){
        res.status(500).json({
            message:"Server Error",
            error:error.message
        });
    }
};
const getMyHostelStudents = async (req, res) => {
    try {

        // 1. Find the logged-in warden
        const warden = await Warden.findOne({
            user: req.user.userId
        });

        if (!warden) {
            return res.status(404).json({
                message: "Warden profile not found"
            });
        }

        // 2. Find all rooms belonging to the warden's hostel
        const rooms = await Room.find({
            hostel: warden.hostel
        });

        // 3. Get only the room IDs
        const roomIds = rooms.map(room => room._id);

        // 4. Find active allocations for those rooms
        const allocations = await RoomAllocation.find({
            room: { $in: roomIds },
            status: "active"
        })
            .populate(
                "student",
                "studentId phone course semester"
            )
            .populate(
                "room",
                "roomNumber floor capacity occupied"
            );

        res.status(200).json({
            message: "Hostel students fetched successfully",
            count: allocations.length,
            students: allocations
        });

    } catch (error) {
        console.log("WARDEN STUDENTS ERROR:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports={
    getMyWardenProfile,
    getMyHostelStudents
}