const mongoose = require('mongoose')


// Define the Message schema
const messageSchema = new mongoose.Schema({
    message: {
      type: String,
      required: true,
    },
  }, {
    timestamps: true
  });
  
  // Create the Message model
  const Message = mongoose.model('FoodItem', messageSchema);

  module.exports = Message;