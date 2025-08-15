const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  startTime: { type: Date, required: true },
  zoomMeetingId: { type: String },
  duration:{type: Number, required: true},
  joinUrl: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "teachers" },
  status: { type: String, enum: ["scheduled", "started", "ended"], default: "scheduled" }
});

module.exports = mongoose.model("Livesessions", meetingSchema);
