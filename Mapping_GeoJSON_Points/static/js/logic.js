

// Add console.log to check to see if our code is working.
console.log("working");
console.log('logic loading')
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};
// let cityData = cities;

// Create the map object with a center (lat and long) and zoom level.
let map  = L.map('mapid').setView([37.5, -122.5], 10
    );
// let line = [
//     [33.9416, -118.4085],
//     [30.1975, -97.6664],
//   [43.6777, -79.6248],
//   [40.6413, -73.7781],
// ];

L.geoJson(sanFranAirport, {
    onEachFeature: function(data, layer) {
        console.log(layer);
        layer.bindPopup();
    }
}).addTo(map)
// L.geoJson(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {
//       console.log(feature);
//       return L.marker(latlng);
//     }

//   }).addTo(map);

// L.polyline(line, {color: "blue", weight:4, dashArray:"5,10"}).addTo(map);
// Another way, which is useful to add multiple tile layers 
// background image of maps 
// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

//  Add a marker to the map for Los Angeles, California.
// let marker = 
// L.circle([34.0522, -118.2437], 
//         {radius:300,
//         color: "black",
//         fillColor: '#FFFF00',
//         fillOpacity: 0.5
//     }).addTo(map);
    
// cityData.forEach(function(city) {
// 	console.log(city)
// 	L.circleMarker(city.location, {
//     radius:(city.population/200000),
//     color: "orange",
//     fillColor: "#f03",
//     fillOpacity: 0.5,
//     weight: 4
//     })
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + 
//         city.population.toLocaleString() + "</h3>")
//   .addTo(map);
// });

// / We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
