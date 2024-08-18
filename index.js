const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Message = require("./models/messages");
require("dotenv").config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// GET all message items
app.get("/admin", async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).json({ messages });
  } catch (error) {
    console.log("Error in fetching messages", error.message);
    res.status(500).json({ success: false, data: "Server Error" });
  }
});

// POST a new food item
app.post("/send-message", async (req, res) => {
  const message = req.body;

 
    // return res.status(400).json({ message: "Please provide message" });
  const newMessage = new Message(message);
  try {
    await newMessage.save();
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    console.log("Error in create message", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// DELETE a food item
app.delete("/admin/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Message.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Message deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Message not found" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
