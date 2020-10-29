//dependencies 
const express = require("express");
const path = require("path");
const fs = require("fs");
const UUID = require('uuid');
const { json } = require("express");
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
app.delete("/api/notes/:id", function (req, res) {
    fs.readFile('./db/db.json', function (err, data) {
        let oldNotes = JSON.parse(data); //oldNotes looks like this: [{noteobj1}, {noteobj2}...]

        //Filter out the object you want to delete. Then writeFile with the filtered array.
        /*
        alright! I think I can leave you at this right? You'll need a callback that checks for the elements that
        don't have the same id as req.params.id

        let us know if you have another question!
        */
        let filteredNotes = oldNotes.filter(user => user.id !== req.params.id)


        //here? Yeah! Let me move ccomments around. i start out with this right? okay thank you david 
        fs.writeFile('./db/db.json', JSON.stringify(filteredNotes),) //and we'll change this to the new variable.
        if (err) throw err;
    })
})


//can i use the filter method? YES! Exactly!




//listener 
app.listen(PORT, function () {
    console.log("Responding to PORT, http://localhost:" + PORT);
});
