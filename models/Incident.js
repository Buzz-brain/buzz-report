const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userId: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true }, // The Cloudinary URL
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Incident', incidentSchema);
