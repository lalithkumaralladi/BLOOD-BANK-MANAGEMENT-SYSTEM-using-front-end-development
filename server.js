// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/bloodbank", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB error:", err));

// Schemas
const HospitalSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  emergency: String,
  city: String,
  distance: String,
  available24x7: Boolean,
  emergencyStock: Boolean,
  rating: Number,
  bloodTypes: Object
});

const DonorSchema = new mongoose.Schema({
  name: String,
  bloodType: String,
  city: String,
  hospital: String,
  donationTime: String,
  isFirstTime: Boolean,
  totalDonations: Number
});

const BloodDriveSchema = new mongoose.Schema({
  title: String,
  date: Date,
  location: String,
  organizer: String,
  registrations: Number
});

// Models
const Hospital = mongoose.model("Hospital", HospitalSchema);
const Donor = mongoose.model("Donor", DonorSchema);
const BloodDrive = mongoose.model("BloodDrive", BloodDriveSchema);

// Routes
app.get("/hospitals/:city", async (req, res) => {
  const city = req.params.city;
  const hospitals = await Hospital.find({ city: new RegExp(city, "i") });
  res.json(hospitals);
});

app.post("/donors", async (req, res) => {
  const donor = new Donor(req.body);
  await donor.save();
  res.json({ message: "Donor added successfully!" });
});

app.get("/donors/recent", async (req, res) => {
  const donors = await Donor.find().sort({ _id: -1 }).limit(10);
  res.json(donors);
});

app.get("/blooddrives", async (req, res) => {
  const drives = await BloodDrive.find();
  res.json(drives);
});


// Serve static files from frontend (root) directory
const path = require('path');
app.use(express.static(path.join(__dirname, '..')));

// Fallback to index.html for SPA routing (Express v5 compatible, non-API routes only)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
