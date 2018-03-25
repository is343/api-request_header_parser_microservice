"use strict";

var express = require('express');
var app = express();



app.get("/", function (req, res) {
    var software = parseSoftware(req.headers['user-agent']);
    var language = parseLanguage(req.headers['accept-language']);
    var ip = parseIp(req.headers['x-forwarded-for']);
    var userInfo = {
        ipaddress: ip,
        language: language,
        software: software
    };
  res.json(userInfo);
});


// MAIN FUNCTIONS
function parseSoftware(data){
    // str => str
    // parse input data and return OS info
    var start = data.indexOf('(') + 1; // don't include the '('
    var end = data.indexOf(')');
    var parsedData = data.slice(start, end);
    return parsedData;
}

function parseLanguage(data){
    // str => str
    // parse input data and return language info
    var end = data.indexOf(',');
    var parsedData = data.slice(0, end);
    return parsedData;
}

function parseIp(data){
    // str => str
    // parse input data and return IP info
    var end = data.indexOf(',');
    var parsedData = data.slice(0, end);
    return parsedData;
}


// LISTEN FOR REQUESTS
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
