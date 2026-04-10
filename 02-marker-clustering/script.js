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

function getRandomLatLng(map) {
    // get the boundaries of the current map (i.e the lat,lng for each corner)
    const bounds = map.getBounds();
    const bottomLeft = bounds.getSouthWest();
    const topRight = bounds.getNorthEast();

    // find the width and height of the rectangle
    const height = topRight.lng - bottomLeft.lng;
    const width = topRight.lat - bottomLeft.lat;

    // generate a random coordinate within the rectangle
    const randomLng = Math.random() * height + bottomLeft.lng;
    const randomLat = Math.random() * width + bottomLeft.lat;

    return [randomLat, randomLng];
}

// create a marker cluster layer group
// a layer group can store multiple layers
// L.markerClusterGroup is from the Leaflet marker clustering plugin
const markerClusterLayer = L.markerClusterGroup();  
markerClusterLayer.addTo(map);

for (let i = 0; i < 1000; i++) {
    const marker = L.marker(getRandomLatLng(map));
    marker.addTo(markerClusterLayer);
}
