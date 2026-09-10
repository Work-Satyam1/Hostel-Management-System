const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDb = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const hostelRoutes = require("./routes/hostelRoutes");
const roomRoutes = require("./routes/roomRoutes");
const roomAllocationRoutes =require("./routes/roomAllocationRoutes");
const adminRoutes =require("./routes/adminRoutes");
const wardenRoutes=require("./routes/wardenRoutes")

const app = express();

app.use(cors());
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
    res.send("Hostel Management API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/hostels", hostelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/room-allocations", roomAllocationRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/wardens",wardenRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});