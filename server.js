const express = require("express");

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const dataRoutes = require("./routes/dataRoutes");
app.use("/api", dataRoutes);



// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});