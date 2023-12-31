const express = require('express');
const router = express.Router();
//const mongoDB = require('../db'); // Adjust the path based on your project structure

router.post('/foodData', async (req, res) => {
  try {
   // await mongoDB(); // Wait for the MongoDB connection
    console.log(global.food_items);
    res.send([global.food_items,global.foodCategory]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
