#!/bin/env node
//  OpenShift sample Node application
var express = require('express');

var app = express();

app.get('/test', function(req, res) {
    res.send("<h1>hello world!</h1> <h2>yee</h2>");
});

var server = app.listen(3000, function(){
    console.log("testing 3000");
});
