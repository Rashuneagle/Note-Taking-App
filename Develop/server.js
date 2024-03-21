const express = require('express');
const fs = require('fs');
const uuid = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Route for index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to get all notes from db.json
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading db.json:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        try {
            const notes = JSON.parse(data);
            res.json(notes);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Route to save a new note to db.json
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuid.v4();

    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading db.json:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        try {
            const notes = JSON.parse(data);
            notes.push(newNote);
            fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), (err) => {
                if (err) {
                    console.error('Error writing to db.json:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                res.json(newNote);
            });
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
