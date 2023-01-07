// import express lib
const express = require('express');
// import body-parser lib
const bodyParser = require('body-parser');
// import path
const path = require('path');
// create an express application
const app = express();
// implement body-parser to the app
app.use(bodyParser.urlencoded({ extended: false })); 

// route to login page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/login.html'));
    
});

onChangeString();

// post request to login
app.post('/login', (req, res) => {
    console.log(req.body)
    var _html = "<div>" + (req.body.username).escape() + " logged in!</div>"; // return username inside of div tags
    res.status(200).send(_html); // prevent xss using String class based escape method 
});

// port 
const PORT = '3000';

// run app
app.listen(PORT, () => {
    console.log(`listen on port: ${PORT}`);
});

// generate custom sanitizer
function onChangeString() {
    String.prototype.escape = function() {
        var tagsToReplace = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot',    
        };
        return this.replace(/[&<>"]/g, function(tag) {
            return tagsToReplace[tag] || tag;
        });
    };
}