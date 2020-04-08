// Add console.log to check to see if our code is working.
console.log("working");
console.log('logic loading')
console.log(API_KEY)


// Create the map object with a center (lat and long) and zoom level.
let map  = L.map('mapid').setView([40.7, -94.5], 4);

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
L.circle([34.0522, -118.2437], 
        {radius:300,
        color: "black",
        fillColor: '#FFFF00',
        fillOpacity: 0.5
    }).addTo(map);


// / We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);