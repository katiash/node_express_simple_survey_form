// NEED to Install "Express" BEFORE running this file:

var express = require("express"); 
//Requiring Express returns an "application creator", which we store in variable "express".

// SESSION REQUIREment HERE (BEFORE invoking EXPRESS!!)
var session = require('express-session');

 //Using the "application creator" (i.e. "CreateApplication" function) we can create an Express app, like so...
var app = express();
 // console.log(`APP is ${app}`);
 // "app" is now an app with ability to run methods like GET and POST, to handle HTTP requests.

 //TELL EXPRESS to USE SESSION HERE:
app.use(session({secret: 'codingdojorocks'})); // give it a string for encryption!

 //require 'body-parser' to see POST data (FORM submitted data):
var bodyParser = require('body-parser');
 //use it!
app.use(bodyParser.urlencoded({extended: true}));
 //This object will contain key-value pairs, where the value can be a string or array
 // (when extended is false), or any type (when extended is true).
 //The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format,
 // allowing for a JSON-like experience with URL-encoded.
 // https://github.com/expressjs/body-parser for more info on "bodyParser.urlencoded([options]).
 // JSON(JS Object Notation -  lightweight data-interchange format )
 //Let's tell our server to *use* the "/static" folder for *static* content

 // path module -- try to figure out where and why we use this
 // var path = require("path");

app.use(express.static(__dirname + "/static"));
 //__dirname holds this: C:\Users\Katia\Desktop\MEAN\hello_express
 // IF USING PATH:
 // static content
 // app.use(express.static(path.join(__dirname, "./static")));

 //Similarly, *set* the location for EJS views (dynamically changed views): 
app.set('views', __dirname + '/views');
 // IF USING PATH:
 // setting up ejs and our views folder
 // app.set('views', path.join(__dirname, './views'));
 //And tell Express to set EJS as our View Engine:
app.set('view engine', 'ejs');

console.log(`__dirname holds this: ${__dirname}`);

// "app" is now an app with ability to run methods like GET and POST, to handle HTTP requests. 
 // Let's handle our base route '/', i.e. the root URL/route:
app.get('/', function(request, response) {
    //Simply curious what is app.get and what is in the request object saved under header key...
    // console.log(`At root app.get is: ${app.get}`);
    // console.log(`At root request.header items: ${request.header}`);
    //response.send("Hello Express"); //In Node, we had this as "response.send(contents)".
   response.render('index');
});

app.get('/result', function(req, res){
    //console.log(`At /result app.get is: ${app.get}`);
    //console.log(`At /result request.header items: ${request.header}`);
    console.log(`At /result request.body items: ${req.body}`);
    console.log(`At /result request.body items: ${req.session.survey_result}`);
    console.log(typeof req.session.survey_result );
    // if (typeof(req.session.survey_result)!==undefined){
        return res.render('result', {survey_result : req.session.survey_result&&req.session.survey_result.survey });
    // }
    // else {
    //     req.session.survery_result = {survey : {name: 'default', dojo_loc : 'default', fave_lang : 'default', comment : 'default'}};
    //     console.log(req.session.survey_result.survey.name);
    //     return res.render('result',{survey_result: req.session.survey_result.survey });
    // }
});

// post route for adding a user
app.post('/', function(req, res) {
    console.log("POST DATA", req.body);
    req.session.survey_result=req.body;
    // This is where we would add the user to the database
    // Then redirect to the root route
    res.redirect('/result');
});

// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});