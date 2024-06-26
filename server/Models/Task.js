const mongoose = require("mongoose");

const TaskScehma = mongoose.Schema({
  useremail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default : ""
  },

  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


const Task = mongoose.model("task", TaskScehma);

module.exports = Task; 