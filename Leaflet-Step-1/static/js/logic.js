//Activity 1 Day 2
// Creating map object
var myMap = L.map("map", {
    center: [0, 0],
    zoom: 5
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
    if (mag > 0) {
        return mag * 100000
    } else {
        return 1
    }
};


//Grab data with d3

// Grabbing our GeoJSON data..
d3.json(geoData, function(data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
        style: function(features) {
            return {
                color: "white",
                fillColor: chooseColor(features.properties.mag),
                fillOpacity: 1,
                weight: 1.5,
                radius: markerSize(features.properties.mag)
            };
        },
        // Binding a pop-up to each layer
        onEachFeature: function(features, layer) {
            layer.bindPopup("Earthquake Magnitude: " + features.properties.mag + "<br>Location: <br>" +
                +features.properties.place);
        },
        pointToLayer: function(features, latlng) {
            return
            // Create a circle and pass in some initial options
            L.circleMarker(latlng)

        }
    }).addTo(myMap);

    // // // Define arrays to hold created earthquake markers
    // var earthquakeMarkers = [];


    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var limits = [0, 3.9, 4.9, 5.9, 6.9, 7.9, 10];
        var colors = ["green", "#ADFF2F", "yellow", "orange", "red", "purple"];
        var labels = [];

        //   // Add min & max
        //   var legendInfo = "<h1>Median Income</h1>" +
        //     "<div class=\"labels\">" +
        //       "<div class=\"min\">" + limits[0] + "</div>" +
        //       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        //     "</div>";

        //   div.innerHTML = legendInfo;

        limits.forEach(function(limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };

    // Adding legend to the map
    legend.addTo(myMap);

});