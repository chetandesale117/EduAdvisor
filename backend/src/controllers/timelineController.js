import Timeline from "../models/timelineModel.js";

// ✅ Add new event (admin only)
export const addEvent = async (req, res) => {
  try {
    const event = await Timeline.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Get all events (students + admins)
export const getEvents = async (req, res) => {
  try {
    const events = await Timeline.find().sort({ date: 1 }); // upcoming first
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
