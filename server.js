/* 
 * Created by Nandit
 */

// import the packages 
var express    = require('express'),
    bodyParser = require('body-parser'),
    morgan     = require('morgan');

var app        = express();
// app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/js", express.static(__dirname + '/public/js'));

// Importing routes
var routes = require('./app/routes.js');

// REGISTER OUR ROUTES 
app.use('/api', routes);

app.get("/",function indexPage(req,res) {
	res.sendFile(__dirname + '/public/index.html');
})


// Set up port
var port     = process.env.PORT || 9010; 
app.listen(port);
console.log('App is running on the port ' + port);

module.exports = app