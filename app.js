console.log("App Started");
const session = require("express-session");
const flash = require("connect-flash");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const taskRoutes = require("./routes/taskRoutes");
const connectDB = require("./config/db");
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "student-task-manager",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use((req, res, next) => {

    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");

    next();

});

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", taskRoutes);
connectDB();
app.use((req, res) => {

    res.status(404).render("404");

});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});