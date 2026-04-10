// for leaflet, the format [lat, lng]
const singapore = [1.3521, 103.8198];

// L is a global object from the leaflet.min.js
// L.map is to create a new map and takes one parameter
// the ID of the element to create the map
const map = L.map("map");

// map.setView takes two parameter
// parameter 1: the center point of the map (in lat,lng)
// parameter 2: the zoom level
map.setView(singapore, 13);

// a layer in leaflet is a visual object that is in the map
// the tile layer is the bottommost layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    referrerPolicy: "strict-origin-when-cross-origin"
}).addTo(map);

// Add a marker at universal studio
const marker = L.marker([1.256328, 103.821628]).addTo(map);

// add a click event listener to a layer
marker.addEventListener("click", function () {
    alert("Universal Studios");
})

const marinaBaySands = L.marker([1.2825834, 103.8602202]).addTo(map);
marinaBaySands.bindPopup(`
     <h1>Marina Bay Sands</h1>
     <p>Marina Bay Sands (often colloquially shortened to 'MBS') is an 
     integrated resort fronting Marina Bay in Singapore and a landmark of the city.
      At its opening in 2010, it was deemed the world's most expensive
       standalone casino property at S$8 billion</p>
    `);

const circle = L.circle([1.3586, 103.9899], {
    radius: 500,
    color: "red",
    fillOpacity: 0.5,
    fillColor:"yellow"
});

// add the circle to the map
circle.addTo(map);