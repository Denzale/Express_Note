//dependencies 
const express = require("express");
const path = require("path");
const fs = require("fs");
const UUID = require('uuid');
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



//API Route
app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", function (err, data) {
        if (err) throw (err);
        let notes = JSON.parse(data)
        return res.json(notes);
    })

});

//HTML Route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../index.html"));
});


//POST New Notes
app.post("/api/notes", function (req, res) {
    let newNotes = req.body;

    newNotes.id = UUID.v1();

    fs.readFile("./db/db.json", "utf8", function (err, data) {
        let oldNotes = (JSON.parse(data));

        oldNotes.push(newNotes);


        fs.writeFile("./db/db.json", JSON.stringify(oldNotes), "utf8", function (err) {
            if (err) throw err;

        })
    })
    res.json(newNotes)
});

//DELETES Notes.. having problems 
app.delete ("/api/notes/:id", function(req, res) {
    fs.readFile('./db/db.json', function(err,data){
        if (err) throw err;






//listener 
app.listen(PORT, function () {
    console.log("Responding to PORT, http://localhost:" + PORT);
});
