const express = require("express");
const router = express.Router();
const db = require("../firebase");

const beep = require("beepbeep");

let attackedDevices = new Set();

// 🧠 Detection
function detectBotnet(packet_size, request_count, device_id) {
    if (request_count > 10 || packet_size > 500) {

        if (!attackedDevices.has(device_id)) {
            console.log("🚨 BOTNET DETECTED from:", device_id);
            beep(2);
            attackedDevices.add(device_id);
        }

        return "ATTACK";
    }
    return "NORMAL";
}

// 📥 POST data
router.post("/data", async (req, res) => {
    try {
        const { device_id, packet_size, request_count } = req.body;

        const status = detectBotnet(packet_size, request_count, device_id);

        await db.collection("devices").add({
            device_id,
            packet_size,
            request_count,
            status,
            timestamp: new Date()
        });

        res.json({ message: "Stored in Firebase", status });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📊 GET summary
router.get("/summary", async (req, res) => {
    try {
        const snapshot = await db.collection("devices")
            .orderBy("timestamp", "desc")
            .get();

        const map = {};

        snapshot.forEach(doc => {
            const data = doc.data();
            if (!map[data.device_id]) {
                map[data.device_id] = data.status;
            }
        });

        const result = Object.keys(map).map(id => ({
            _id: id,
            latestStatus: map[id]
        }));

        res.json(result);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;