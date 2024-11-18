const express = require('express');
const Incident = require('../models/Incident');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware'); // Middleware for token verification

// Report an incident
router.post('/', verifyToken, async (req, res) => {
  const { description, location, liveStreamUrl } = req.body;

  try {
    const incident = new Incident({
      userId: req.user.userId, // Get the user ID from the token
      description,
      location,
      liveStreamUrl,
    });

    await incident.save();
    res.status(201).json({ message: 'Incident reported successfully', incident });
  } catch (error) {
    res.status(500).json({ error: 'Error reporting incident' });
  }
});

// Get all incidents (for admin)
router.get('/', verifyToken, async (req, res) => {
  try {
    const incidents = await Incident.find().populate('userId', 'username');
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving incidents' });
  }
});

module.exports = router;
