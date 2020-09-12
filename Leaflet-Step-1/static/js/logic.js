//Activity 1 Day 2
// Creating map object
var myMap = L.map("map", {
    center: [14.2350, -14.9253],
    zoom: 3
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
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//creating earthquake data layer group
var earthquakes = new L.LayerGroup();

//Grab data with d3

// Grabbing our GeoJSON data..
d3.json(geoData, function(data) {

    // Function that will determine the color of the marker based on the magnitude classification for earthquakes
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
        if (mag > 0) {
            return mag * 5
        } else {
            return 1
        }
    };

    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
        pointToLayer: function(feature, latlong) {
            return L.circleMarker(latlong);
        },
        style: function(feature) {
            return {
                color: "white",
                fillColor: chooseColor(feature.properties.mag),
                fillOpacity: 1,
                weight: 1.5,
                radius: markerSize(feature.properties.mag)
            };
        },
        // Binding a pop-up to each layer
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Earthquake Magnitude: " + feature.properties.mag + "<br>Location: <br>" +
                +feature.properties.place);
        },

    }).addTo(myMap);

    // // // Define arrays to hold created earthquake markers
    // var earthquakeMarkers = [];


    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function(myMap) {
        var div = L.DomUtil.create("div", "info legend");
        var grades = [0, 3.9, 4.9, 5.9, 6.9, 7.9]
        var colors = ["green", "#ADFF2F", "yellow", "orange", "red", "purple"];
        //var labels = [];

        // Looping through
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                "<i style='background: " + colors[i] + "'></i> " +
                grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }
        return div;
    };

    // Adding legend to the map
    legend.addTo(myMap);

});