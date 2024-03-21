const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Define route to handle reading saved notes
router.get('/', (req, res) => {
    //reads file asynchronously and creates path to db.json location and takes parameters for errors and data
    fs.readFile(path.join(__dirname, '../db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading db.json:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      try {
        //converts string to notes from String to JSON
        const notes = JSON.parse(data);
        res.json(notes) 
        return;
        
      } catch (error) {
        console.error('Error parsing JSON:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  });
  


module.exports = router;
