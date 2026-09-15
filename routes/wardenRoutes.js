const express=require("express")
const router=express.Router()

const authMiddlerware=require("../middleware/authMiddleware");

const {getMyWardenProfile, getMyHostelStudents}=require("../controllers/wardenController");

router.get("/me",authMiddlerware,getMyWardenProfile);
router.get("/students",authMiddlerware,getMyHostelStudents);

module.exports=router;