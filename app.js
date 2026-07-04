const express = require("express");

const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = 3000;

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.send("<h1>About Page</h1>");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
