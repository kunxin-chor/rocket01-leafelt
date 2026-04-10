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

const url = "https://gist.githubusercontent.com/trentglobal-sg/5be9184ab54eee87fe1e764a1b008d7d/raw/d850a140b1090ea823405d63585061db76b4a58b/locations.json";

async function loadLocations() {
    const response = await axios.get(url);
    for (eachLocation of response.data.tourist_spots) {
        const marker = L.marker([eachLocation.lat, eachLocation.lng]);
        marker.addTo(map);
        marker.bindPopup(`<h1>${eachLocation.name}</h1>`);
    }
}
loadLocations();