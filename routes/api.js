const api = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');


// Reads all notes from the DB
api.get("/notes", (req, res) => {
    readFromFile("./db/db.json")
    .then(function (data) {
        res.json(JSON.parse(data));
    });
});

// Creates a new note with a unique ID
api.post("/notes", (req, res) => {
    let newNote = req.body;
    newNote.id = uuidv4();
    readAndAppend(newNote, "./db/db.json")
    res.json(`Note added successfully :rocket:`)
});

// Deletes a note based on ID passed into params
api.delete("/notes/:id", (req, res) => {
    readFromFile("./db/db.json")
    .then(function (data) {
        let notes = JSON.parse(data);
        for (let i=0; i < notes.length; i++) {
            if (notes[i].id === req.params.id) {
                notes.splice(i, 1);
            }
        }
        writeToFile("./db/db.json", notes)
        res.json(`Note removed successfully!`)
    });
});

module.exports = api;