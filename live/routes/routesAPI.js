app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", function (err, data) {
        if (err) throw (err);
        let notes = JSON.parse(data)
        return res.json(notes);
    })

});