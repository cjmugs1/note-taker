const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const app = require("express").Router();

// Reads all notes from the DB
app.get("/notes", (req, res) => {
    readFromFile("../db/db.json")
    .then(function (data) {
        res.json(JSON.parse(data));
    });
});

// Creates a new note with a unique ID
app.post("/notes", (req, res) => {
    let newNote = req.body
    newNote.id = uuidv4();
    readAndAppend(newNote, "../db/db.json").then(function (data) {
      res.json(JSON.parse(data));
    });
});

app.delete("/notes/:id", (req, res) => {
    readFromFile("../db/db.json")
    .then(function (data) {
        for (let i=0; i < data.length; i++) {
            if (data[i].id === req.params.id) {
                data.splice(i, 1);
            }
        }
        writeToFile("../db/db.json", data)
        res.json(JSON.parse(data))
    });
});