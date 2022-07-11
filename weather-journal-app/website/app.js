/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = ( d.getMonth() + 1 ) + '.' + d.getDate() + '.' + d.getFullYear();

// API Key.
const apiKey = "b05e081707568e6ccb091c3bc9943284&unites=imperial";

document.getElementById("generate").addEventListener("click", eve => {
	eve.preventDefault();
	
	const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;
	const zip = document.getElementById("zip").value + "&appid=";
	
	getWeatherData(baseURL, zip, apiKey)
			.then(data => postWeatherData(data, "/"))
			.then(() => getDataAndUpdateUI("/all"))
			.catch(err => console.error("Error", err));
});

// Get a weather data from an external source.
const getWeatherData = async (base, zip, api) => {
	const data = await fetch(base + zip + api);
	
	return await data.json();
}

// POST the weather data to the project endpoint.
const postWeatherData = async (data, url) => {
	const feelings = document.getElementById("feelings").value;
	const dataObj = {date: newDate, temp: data.main.temp, userRes: feelings};
	
	fetch(url, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(dataObj)
	});
}

// Get the data from the server endpoint & update the UI dynamically.
const getDataAndUpdateUI = async url => {
	const req = await fetch(url);
	
	const data = await req.json();
	
	document.getElementById("date").innerHTML = data.date;
	document.getElementById("temp").innerHTML = Math.round(data.temp) + " degrees";
	document.getElementById("content").innerHTML = data.userRes;
}