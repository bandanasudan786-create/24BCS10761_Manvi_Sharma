const express = require("express")
const mongoose = require("mongoose");
const Registration = require("./Registration")

const app = express()

app.use(express.json());
mongoose.connect("mongodb+srv://bloguser:blogpassword123@cluster0.27avgjh.mongodb.net/blogging")
    .then(()=>{
        console.log("DB Connected");
        app.listen(3000,()=>{
            console.log("Server running on port 3000");
        });
    })
    .catch(err => console.log(err.message));
app.post("/api/registrations", async (req, res) => {
    try{
        const data = new Registration(req.body);
        await data.save();
        res.status(201).json({
            message: "Registered successfully",
            data
        });
    }
    catch(err)
    {
        if(err.code=== 11000)
        {
            return res.status(409).json({message:"Email already exists"});
        }

        if(err.name=== "ValidationError") {
            return res.status(400).json({
                errors:Object.values(err.errors).map(e=>e.message)
            });
        }

        res.status(500).json({ message:"Server error"});
    }
});

app.get("/api/registrations",async(req, res)=>
{
    try{
        const filter = {};
        if(req.query.eventType)
            filter.eventType =req.query.eventType;
        if(req.query.status)
            filter.status =req.query.status;

        const data=await Registration.find(filter);
        res.status(200).json(data);
    }
    catch(err)
    {
        res.status(500).json({message:"Server error"});
    }
});

app.get("/api/registrations/:id",async (req, res)=>
{
    try{
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id))
        {
            return res.status(400).json({ message: "Invalid ID" });
        }
        const data = await Registration.findById(id);
        if(!data)
        {
            return res.status(404).json({ message: "Not found" });
        }

        res.status(200).json(data);
    }
    catch(err)
    {
        res.status(500).json({ message: "Server error" });
    }
});

app.put("/api/registrations/:id", async (req, res) => {
    try{
        const id = req.params.id;
        if(!mongoose.isValidObjectId(id))
        {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const data = await Registration.findById(id);
        if(!data)
        {
            return res.status(404).json({ message: "Not found" });
        }
        if (req.body.studentName !== undefined)
            data.studentName = req.body.studentName;
        if (req.body.collegeEmail !== undefined)
            data.collegeEmail = req.body.collegeEmail;
        if (req.body.rollNumber !== undefined)
            data.rollNumber = req.body.rollNumber;
        if (req.body.eventType !== undefined)
            data.eventType = req.body.eventType;
        if (req.body.teamSize !== undefined)
            data.teamSize = req.body.teamSize;
        if (req.body.ticketPrice !== undefined)
            data.ticketPrice = req.body.ticketPrice;
        if (req.body.discountCode !== undefined)
            data.discountCode = req.body.discountCode;
        if (req.body.status !== undefined)
            data.status = req.body.status;
        if (req.body.registrationDate !== undefined)
            data.registrationDate = req.body.registrationDate;
        await data.save();

        res.status(200).json({
            message: "Updated successfully",
            data
        });
    }
    catch(err)
    {
        if(err.code === 11000)
        {
            return res.status(409).json({message:"Email already exists" });
        }

        if(err.name === "ValidationError")
        {
            return res.status(400).json({
                errors: Object.values(err.errors).map(e =>e.message)
            });
        }

        res.status(500).json({message:"Server error"});
    }
});

app.delete("/api/registrations/:id", async (req, res) =>
{
    try
    {
        const id = req.params.id;
        if(!mongoose.isValidObjectId(id))
        {
            return res.status(400).json({message:"Invalid ID" });
        }

        const data = await Registration.findByIdAndDelete(id);
        if(!data)
        {
            return res.status(404).json({ message: "Not found" });
        }

        res.status(200).json({ message: "Deleted successfully" });
    }
    catch (err)
    {
        res.status(500).json({ message: "Server error" });
    }
});