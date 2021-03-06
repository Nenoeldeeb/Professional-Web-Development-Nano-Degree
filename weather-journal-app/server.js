// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Initialize port number.
const port = 8080;

// Setup Server
app.listen(port, () => console.log(`The server is up & running on http://localhost:${port}.`));

// Setup GET route from "/all".
app.get("/all", (req, res) => {
	res.send(projectData);
});

// Setup POST route to "/".
app.post("/", (req, res) => {
	projectData.date = req.body.date;
	projectData.temp = req.body.temp;
	projectData.userRes = req.body.userRes;
	
	res.send("The POST request received successfully.");
});