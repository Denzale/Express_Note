app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/live/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/live/notes.html"));
});

app.get("*", function (req, res){
    res.sendFile(path.join(__dirname, "../index.html"));
});