const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/myDatabase", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Welcome to the backend API!");
});

const FormDataSchema = new mongoose.Schema({
  name: String,
  age: Number,
  phone: Number,
});

const FormData = mongoose.model("FormData", FormDataSchema);

app.post("/submit-form", async (req, res) => {
  const { name, age, phone } = req.body;

  if (!name || !age || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newFormData = new FormData({ name, age, phone });

  try {
    await newFormData.save();
    res.status(201).json({ message: "Data saved successfully", data: newFormData });
  } catch (error) {
    res.status(500).json({ error: "Error saving data", details: error.message });
  }
});

app.get("/get-data", async (req, res) => {
  try {
    const data = await FormData.find();
    if (data.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }
    res.status(200).json({
      message: "Data retrieved successfully",
      data: data.map(({ _id, name, age, phone }) => ({
        id: _id,
        name,
        age,
        phone,
      })),
    });
  } catch (error) {
    const express = require("express");
    const mongoose = require("mongoose");
    const cors = require("cors");
    const bodyParser = require("body-parser");
    require("dotenv").config();

    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    mongoose
      .connect("mongodb://localhost:27017/myDatabase", { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.log("MongoDB connection error:", err));


    app.get("/", (req, res) => {
      res.send("Welcome to the backend API!");
    });


    const FormDataSchema = new mongoose.Schema({
      name: String,
      age: Number,
      phone: Number,
    });

    const FormData = mongoose.model("FormData", FormDataSchema);


    app.post("/submit-form", async (req, res) => {
      const { name, age, phone } = req.body;

      if (!name || !age || !phone) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const newFormData = new FormData({ name, age, phone });

      try {
        await newFormData.save();
        res.status(201).json({ message: "Data saved successfully", data: newFormData });
      } catch (error) {
        res.status(500).json({ error: "Error saving data", details: error.message });
      }
    });


    app.get("/get-data", async (req, res) => {
      try {
        const data = await FormData.find();
        if (data.length === 0) {
          return res.status(404).json({ message: "No records found" });
        }
        res.status(200).json({
          message: "Data retrieved successfully",
          data: data.map(({ _id, name, age, phone }) => ({
            id: _id,
            name,
            age,
            phone,
          })),
        });
      } catch (error) {
        res.status(500).json({ error: "Error fetching data", details: error.message });
      }
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    res.status(500).json({ error: "Error fetching data", details: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
