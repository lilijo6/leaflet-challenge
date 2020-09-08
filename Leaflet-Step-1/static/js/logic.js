//Activity 1 Day 2
// Creating map object
var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 11
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

// Load in geojson data
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

// Function that will determine the color of the marker based on the magnitude
function chooseColor(mag) {
    if (mag < 3.9) {
        return "green"
    } else if (mag < 4.9) {
        return "#ADFF2F"
    } else if (mag < 5.9) {
        return "yellow"
    } else if (mag < 6.9) {
        return "orange"
    } else if (mag < 7.9) {
        return "red"
    } else {
        return "#8B0000"
    }
};

//Activity 9 Day 1
// Function to determine marker size based on magnitude
function markerSize(mag) {
    return mag / 40;
}


//Grab data with d3

d3.json(geoData, function(data) {

    //Create a new geoJSON layer with the retrieved data
    L.geoJson(data, {
        //Passing in our
    })
})



// Define arrays to hold created earthquake markers
var earthquakeMarkers = [];