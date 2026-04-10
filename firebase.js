let latestData = [];

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

  // 🔥 LIMIT DATA
  if (latestData.length > 50) {
    latestData.shift();
  }

  console.log("Incoming:", entry);

});

// 🔥 API
app.get("/data", (req, res) => {
  res.json(latestData);
});