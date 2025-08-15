const express = require("express");
const {
  createMeeting,
  listMeetings,
  updateMeeting,
  deleteMeeting
} = require("../Controllers/LiveSessionController");

const router = express.Router();

router.post("/", createMeeting);        // POST /api/meetings
router.get("/", listMeetings);          // GET /api/meetings
router.put("/:id", updateMeeting);      // PUT /api/meetings/:id
router.delete("/:id", deleteMeeting);   // DELETE /api/meetings/:id

module.exports = router;
