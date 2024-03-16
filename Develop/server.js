const express = require('express');
const fs = require('fs');
const uuid = require('uuid');
const notesData = require('./db/db.json')
const PORT = process.env.PORT || 3000

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
  });



  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.get('/api/notes', (req, res) => {
  // Read the contents of the db.json file
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    try {
      // Parse the JSON data into a JavaScript object
      const notes = JSON.parse(data);
      // Send the parsed data as a JSON response
      res.json(notes);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});


  app.post('/api/notes', (req, res) =>  {
    const newNote = req.body
    newNote.id = uuid();

  //parses notes in the dbjson to javascript object
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'));
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(notes));


  res.json(newNote)
  
});
  
  


  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });