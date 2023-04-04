const api = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils.js');

const dbPath = "./db/db.json";

// Reads all notes from the DB
api.get("/notes", (req, res) => {
    readFromFile(dbPath)
    .then(function (data) {
        res.json(JSON.parse(data));
    })
    .catch(err => console.log(err));
});

// Creates a new note with a unique ID
api.post("/notes", (req, res) => {
    let newNote = req.body;
    newNote.id = uuidv4();
    readAndAppend(newNote, dbPath)
    res.json(`Note added successfully :rocket:`)
});

// Deletes a note based on ID passed into params
api.delete("/notes/:id", (req, res) => {
    readFromFile(dbPath)
    .then(function (data) {
        let notes = JSON.parse(data);
        for (let i=0; i < notes.length; i++) {
            if (notes[i].id === req.params.id) {
                notes.splice(i, 1);
            }
        }
        writeToFile(dbPath, notes)
        res.json(`Note removed successfully!`)
    });
});

module.exports = api;