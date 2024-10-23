const express = require('express');
const run = require('../utils/geminiapi'); // Adjust path as needed
const router = express.Router();
const Roadmap = require('../Models/roadmap');
const UserModel = require('../Models/user'); // Assuming you have a Roadmap model

// Route to generate and save roadmap
router.post("/generate-roadmap", async (req, res) => {
  try {
    const { prompt, userId } = req.body; // Expecting the prompt and userId from the client
    const response = await run(prompt); // Call the AI function to get roadmap data

    // Save the generated roadmap to the database
    const newRoadmap = new Roadmap({
      userId,             // Associate the roadmap with the user
      roadmapData: response, // Store the AI-generated response (roadmap)
      createdAt: new Date() // Add a timestamp if needed
    });

    await newRoadmap.save(); // Save the roadmap document to the database

    // Send the saved roadmap as a response
    res.status(201).json(newRoadmap);
    
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error generating the roadmap");
  }
});

// Route to fetch roadmaps by user ID
router.get('/roadmaps', async (req, res) => {
  const { userId } = req.params; // Get the user ID from the URL parameters

  try {
    // Fetch the roadmaps associated with the user
    const roadmaps = await Roadmap.find({ userId }); // Adjust the query as per your schema
    res.json(roadmaps);
  } catch (error) {
    console.error('Error fetching roadmaps:', error);
    res.status(500).json({ error: 'Failed to fetch roadmaps', details: error.message });
  }
});

module.exports = router;
