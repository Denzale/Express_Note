//dependencies 
const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

// Sets up the Express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));




app.listen(PORT, function () {
    console.log("App listening on PORT, http://localhost:" + PORT);
});
