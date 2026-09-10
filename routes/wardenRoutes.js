const express=require("express")
const router=express.Router()

const authMiddlerware=require("../middleware/authMiddleware");

const {getMyWardenProfile}=require("../controllers/wardenController");

router.get("/me",authMiddlerware,getMyWardenProfile);

module.exports=router;