const Warden=require("../models/Warden");

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

module.exports={
    getMyWardenProfile
}