const express = require('express');
const fs = require('fs');
const uuid = require('uuid');
const notesData = require('./db/db.json')
const PORT = process.env.PORT || 3000

const app = express();

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
  });



  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.get('/api/notes', (req, res) => res.json(notesData));

  app.post('/api/notes', (req, res) => res.json(notesData));


  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });