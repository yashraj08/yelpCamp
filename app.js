var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var nodemailer = require('nodemailer');
var request = require('request');


const uri = "mongodb+srv://YashRaj:Yash1998@blogapp.shvdu.mongodb.net/ok?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true });
var Campground = require("./models/campground");
var Comment = require("./models/comment")
var User = require("./models/user");
var seedDB = require("./seeds");
var indexRoutes = require("./routes/index");
var commentRoutes = require("./routes/comment");
var campRoutes = require("./routes/campground");
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());
//seedDB();

app.use(require("express-session")({
    secret: "jo man hai kar",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})
app.use(indexRoutes);
app.use(commentRoutes);
app.use(campRoutes);
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("yelpcamp started on", process.env.PORT);
})