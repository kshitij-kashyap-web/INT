const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
    device_id: String,
    packet_size: Number,
    request_count: Number,
    status: String, // NORMAL or ATTACK
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Device", deviceSchema);