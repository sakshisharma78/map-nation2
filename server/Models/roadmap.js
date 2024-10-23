const mongoose = require("mongoose");

const RoadmapSchema = new mongoose.Schema({

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
 
  languageName: {
    type: String,
    required: true,
  },
  days: {
    type: String,
    required: true,
  },
  hours: {
    type: String,
    required: true,
  },
  preparingFor: {
    type: String,
    required: true,
  },

  
  roadmapData: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Roadmap", RoadmapSchema);
