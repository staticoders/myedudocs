const Meeting = require("../Models/liveSessionModels");
const { createZoomMeeting } = require("./zoomapi");

// Create Meeting
exports.createMeeting = async (req, res) => {
  const { topic, startTime,duration, createdBy } = req.body;
  
  try {
    const zoomData = await createZoomMeeting(topic, startTime);
    const newMeeting = await Meeting.create({
      topic,
      startTime,
      createdBy,
      zoomMeetingId: zoomData.id,
      duration,
      joinUrl: zoomData.join_url,
      status: "scheduled"
    });
    res.status(201).json(newMeeting);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err);
    
  }
};

// List Meetings
exports.listMeetings = async (req, res) => {
  const meetings = await Meeting.find();
  res.json(meetings);
};

// Update Meeting
exports.updateMeeting = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const meeting = await Meeting.findByIdAndUpdate(id, updates, { new: true });
  res.json(meeting);
};

// Delete Meeting
exports.deleteMeeting = async (req, res) => {
  const { id } = req.params;
  await Meeting.findByIdAndDelete(id);
  res.json({ msg: "Meeting deleted" });
};
