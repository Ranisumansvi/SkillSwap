const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const skillRoutes = require("./routes/skillRoutes");
const matchRoutes = require("./routes/matchRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();

// ================= MIDDLEWARE =================

app.use(cors());

app.use(express.json());


// ================= ROUTES =================

// Authentication
app.use("/api/auth", authRoutes);

// Skills
app.use("/api/skills", skillRoutes);

// Matching
app.use("/api/matches", matchRoutes);

// Exchange Requests
app.use("/api/requests", requestRoutes);


// ================= TEST ROUTE =================

app.get("/", (req, res) => {
    res.send("SkillSwap API is running");
});


// ================= START SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`SkillSwap server running on port ${PORT}`);
});