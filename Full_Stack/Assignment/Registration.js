const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    collegeEmail: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.(edu|ac\.in)$/, "Invalid college email"]
    },
    rollNumber: {
        type: String,
        required: true,
        uppercase: true,
        match: [/^[A-Z0-9]{8,10}$/, "Invalid roll number"]
    },
    eventType: {
        type: String,
        required: true,
        enum: ["CODING_HACKATHON", "AI_WORKSHOP", "ROBOTICS", "GAMING"]
    },
    teamSize: {
        type: Number,
        required: true,
        min: 1,
        max: 4,
        validate: {
            validator: Number.isInteger,
            message: "Team size must be an integer"
        }
    },
    ticketPrice: {
        type: Number,
        required: true,
        min: 0
    },
    discountCode: {
        type: String,
        trim: true,
        uppercase: true,
        validate: {
            validator: function (code) {
                return !code || ["CAMPUS50", "EARLYBIRD"].includes(code);
            },
            message: "Invalid discount code"
        }
    },
    finalAmount: Number,
    status: {
        type: String,
        enum: ["PENDING", "CONFIRMED", "CANCELLED"],
        default: "PENDING"
    },
    registrationDate: {
        type: Date,
        default: Date.now,
        validate: {
            validator: date => date <= new Date(),
            message: "Future date not allowed"
        }
    }
});

schema.pre("validate", function ()
{
    if (this.eventType === "AI_WORKSHOP" && this.teamSize!==1)
    {
        this.invalidate("teamSize", "Team size must be 1 for AI Workshop");
    }

    if(this.discountCode === "CAMPUS50")
    {
        this.finalAmount = this.ticketPrice * 0.5;
    }
    else if(this.discountCode === "EARLYBIRD")
    {
        this.finalAmount = Math.max(0, this.ticketPrice - 100);
    }
    else
    {
        this.finalAmount = this.ticketPrice;
    }
});

module.exports =mongoose.model("Registration", schema);