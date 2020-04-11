

// Add console.log to check to see if our code is working.
console.log("working");
console.log('earthquake 5 loading')
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};
// let cityData = cities;

// Create the map object with a center (lat and long) and zoom level.

    // Accessing the airport GeoJSON URL
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.


let satelliteStreets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",{
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
})

let light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}",{
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
})
let baseMaps = {
    "Street": streets,
    "Satellite": satelliteStreets,
    "Light": light
}

let earthquakes = new L.layerGroup();
let tectonic = new L.layerGroup();

let overlays = {
    Earthquakes: earthquakes,
    Tectonic: tectonic
};

let map  = L.map('mapid',{
    center: [39.5, -98.5], 
    zoom: 3,
    layers : [streets]
})
L.control.layers(baseMaps, overlays).addTo(map)

// let torontoHoods= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
    




d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data){
    L.geoJson(data,{
        pointToLayer: function(feature, latlng ){
            // console.log(data);
            return L.circleMarker(latlng)
        },
        style: styleInfo,
        onEachFeature: function (feature,layer){
            layer.bindPopup("Magnitude: " + feature.properties.mag +
            "<br>Location: " + feature.properties.place + "</br>");
        }
    }).addTo(earthquakes);
    earthquakes.addTo(map)
    
})

let legend = L.control({
    position: "bottomright"
 
});

d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(data){
    L.geoJson(data,{
        color: "orange"

    }).addTo(tectonic);
    tectonic.addTo(map);
    console.log(data)

})

legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'info legend');
    const magnitudes = [0,1,2,3,4,5];
    const colors = [
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
        "#ea2c2c"  
     ];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < magnitudes.length; i++) {
        console.log(colors[i]);  
        div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
         ""+
          magnitudes[i] + (magnitudes[i + 1] ? "–" + magnitudes[i + 1] + "<br>" : "+");
     }
      return div;
    };
   
    legend.addTo(map);




function styleInfo(feature){
    return {
        opacity:1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
};

function getRadius(magnitude){
    if (magnitude ===0) {
        return 1;
    }
    return magnitude *4;
};

function getColor(magnitude){
    if (magnitude >5){
        return "#ea2c2c";
    }
    if (magnitude > 4) {
        return "#ea822c";
      }
      if (magnitude > 3) {
        return "#ee9c00";
      }
      if (magnitude > 2) {
        return "#eecc00";
      }
      if (magnitude > 1) {
        return "#d4ee00";
      }
      return "#98ee00";
}


// let line = [
//     [33.9416, -118.4085],
//     [30.1975, -97.6664],
//   [43.6777, -79.6248],
//   [40.6413, -73.7781],
// ];

// L.geoJson(sanFranAirport, {
//     onEachFeature: function(data, layer) {
//         console.log(layer);
//         layer.bindPopup();
//     }
// }).addTo(map)
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

