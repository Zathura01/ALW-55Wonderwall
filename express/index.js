const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/WonderWall', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Image schema
const imageSchema = new mongoose.Schema({
  fileName: String,
  filePath: String,
});

const Image = mongoose.model('Image', imageSchema);

// Serve static files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, 'images')));
// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Save image to server and store metadata in MongoDB
app.post('/save-image', async (req, res) => {
  const { imageData, fileName } = req.body;

  if (!imageData || !fileName) {
    return res.status(400).send({ error: 'Invalid request' });
  }

  try {
    // Remove base64 metadata
    const base64Data = imageData.replace(/^data:image\/png;base64,/, '');

    // Ensure 'images' folder exists
    const imagesDir = path.join(__dirname, 'images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir);
    }

    // Define file path
    const filePath = path.join(imagesDir, fileName);

    // Save the image to disk
    fs.writeFile(filePath, base64Data, 'base64', async (err) => {
      if (err) {
        console.error('Error saving image:', err);
        return res.status(500).send({ error: 'Failed to save image' });
      }

      // Save image metadata to MongoDB
      const newImage = new Image({ fileName, filePath: `/images/${fileName}` });
      await newImage.save();

      res.status(200).send({ message: 'Image saved to server and MongoDB', filePath: `/images/${fileName}` });
    });
  } catch (err) {
    console.error('Error saving image:', err);
    res.status(500).send({ error: 'Failed to save image' });
  }
});

// Fetch image metadata
app.get('/fetch', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    console.error('Error fetching images:', err);
    res.status(500).send({ error: 'Failed to fetch images' });
  }
});





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
