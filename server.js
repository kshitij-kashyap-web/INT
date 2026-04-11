const express = require("express");
const cors = require("cors");
const player = require("play-sound")();

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 Firebase connect
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://iot-botnet-764ca-default-rtdb.firebaseio.com/"
});
db.ref("data").remove();
latestData = [];

const db = admin.database();

// 🧠 Detection function
function detectBotnet(packet_size, request_count, device_id) {
  if (request_count > 15 || packet_size > 700) {
    console.log("🚨 BOTNET DETECTED from:", device_id);
   // player.play("C:\\Windows\\Media\\Alarm01.wav");
  } else {
    console.log("✅ NORMAL traffic from:", device_id);
  }
}

// 🔥 FIREBASE LISTENER (MOST IMPORTANT)


db.ref("data").on("child_added", (snapshot) => {

  const data = snapshot.val();

  const device_id = data.device_id || "unknown";
  const packet_size = data.packet_size || 0;
  const request_count = data.request_count || 0;

  const status = (request_count > 15 || packet_size > 700) ? "ATTACK" : "NORMAL";

  const entry = {
    device_id,
    packet_size,
    request_count,
    status,
    time: Date.now()
  };

  latestData.push(entry);

  if (latestData.length > 50) {
    latestData.shift();
  }

  console.log("Incoming:", entry);

  detectBotnet(packet_size, request_count, device_id);
});

// test route
app.get("/", (req, res) => {
  res.send("🚀 Botnet Backend Running");
});
app.get("/data", (req, res) => {
  res.json(latestData);
});


// start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});