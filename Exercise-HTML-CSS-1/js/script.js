var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..')));
var mongoose = require("mongoose");
//Connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/webdev-tec");
mongoose.connection.once('open', function(){
    console.log('Connection succesfull!');
    }).on('error',function(error){
        console.log('Connection error!: ',error);
    });
//create Schema
var users = new mongoose.Schema({
    name: String,
    email: String,
    location: String,
    gender: String,
    experience: String,
});

var user = mongoose.model("user", users);
app.get("/", (req, res) => {
    res.sendFile(__dirname + "index.html");
});
app.post("/signup", (req, res) => {
    var myData = new user(req.body);
    myData.save()
        .then(item => {
            res.send("User saved");
        })
        .catch(err => {
            res.status(400).send("Error");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});