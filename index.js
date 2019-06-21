require('dotenv').config();
var express = require('express');
var app = express();
const axios = require('axios');

// this adds some logging to each request
app.use(require('morgan')('dev'));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/static"));

app.get('/', function(req, res) {
    res.render('index');
});

app.get("/results", function(req, res) {
    // can use axios inside of controller functions
    // console.log("https://www.omdbapi.com/?s=" + req.query.movie + "&apikey=" + process.env.OMDBKEY);
    // axios.get("https://www.omdbapi.com/?s=" + req.query.movie + "&apikey=" + process.env.OMDBKEY)
    axios.get(`https://www.omdbapi.com/?s=${req.query.movie}&apikey=${process.env.OMDBKEY}`)
    .then(function(result) {
        // console.log(result.data);
        // res.json(result.data.Search);
        res.render('results', {result: result});
    });
    // use it with promises
    // result is a wrapper around our data
    // need to know what format the data is stored in 
});

app.get("/movies/:movie_id", function(req, res) {
    axios.get("https://www.omdbapi.com/?i=" + req.params.movie_id + "&apikey=" + process.env.OMDBKEY)
    .then(function(result) {
        res.render('movie', {result: result});
    });
});


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
