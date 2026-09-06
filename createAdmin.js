require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");


const createAdmin = async () => {

    try {

        await mongoose.connect(
            process.env.MONGODB_URI
        );

        console.log("MongoDB connected");


        const existingAdmin =
            await User.findOne({
                email: "admin@hostel.com"
            });


        if (existingAdmin) {

            console.log("Admin already exists");

            process.exit(0);
        }


        const hashedPassword =
            await bcrypt.hash(
                "Admin@123",
                10
            );


        const admin =
            await User.create({

                name: "Hostel Admin",

                email: "admin@hostel.com",

                password: hashedPassword,

                role: "admin"

            });


        console.log(
            "Admin created successfully"
        );

        console.log(
            "Email:",
            admin.email
        );

        console.log(
            "Role:",
            admin.role
        );


        process.exit(0);


    } catch (error) {

        console.log(
            "Error:",
            error.message
        );

        process.exit(1);
    }
};


createAdmin();