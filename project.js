//Program that takes an input of the city code from WikiDataID and restores the data of populatoin
//elevation and actual weather data

//input as a cit code  (website API free limitation)
//
let city = "Q34647";

//additional variables
let cities = [];
let temp = [];
let lat;
let lon;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '62c5b1bd0cmsh92e03efdb100db2p1dc18fjsn38c89f6957da',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};
const options1 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '62c5b1bd0cmsh92e03efdb100db2p1dc18fjsn38c89f6957da',
        'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
    }
};

//fetching data from cities API, the link will change depends on the city code provided above, this one works for Johannesburg
fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/cities/'+ city, options)
	.then(response => response.json())
	.then((response) => {
        //storing object in an array, storing coordinates that we will need for weather API and displaying information
        cities = response.data;
        lat = cities.latitude.toFixed(1);
        lon = cities.longitude.toFixed(1);
        console.log(cities.name)
        console.log(`Elevation of ${cities.name}: ${cities.elevationMeters}`)
        console.log(`Population of ${cities.name}: ${cities.population}`)
        //fetching data from weather using the latitude and longitude from the website to change the link
        fetch('https://weatherbit-v1-mashape.p.rapidapi.com/current?lon='+lon+'&lat='+lat, options1)
        .then(res => res.json())
        .then((res) => {
            temp = res.data;
            console.log(`Current temperature data in ${cities.name}:`)
            console.log(temp);
        })
        .catch(err => console.error(err));
    
    })
    .then(() => {
        console.log(lat);
        console.log(lon);
    })    
	.catch(err => console.error(err));


  

    


    