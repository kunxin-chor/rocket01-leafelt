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
const defaultLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    referrerPolicy: "strict-origin-when-cross-origin"
}).addTo(map);

const stadiaLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
}).addTo(map);

const url = "https://gist.githubusercontent.com/trentglobal-sg/5be9184ab54eee87fe1e764a1b008d7d/raw/d850a140b1090ea823405d63585061db76b4a58b/locations.json";

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

// create a tourist layer group
const touristLayer = L.layerGroup();
touristLayer.addTo(map);

async function loadLocations() {
    const response = await axios.get(url);
    for (eachLocation of response.data.tourist_spots) {
        const marker = L.marker([eachLocation.lat, eachLocation.lng]);
        marker.addTo(touristLayer);
        marker.bindPopup(`<h1>${eachLocation.name}</h1>`);
    }
}
loadLocations();

const circleLayer = L.layerGroup();
circleLayer.addTo(map);

for (let i = 0; i < 5; i++) {
    const randomLatLng = getRandomLatLng(map);
    L.circle(randomLatLng, {
        radius: 500,
        fillColor: "red",
        fillOpacity: 0.5
    }).addTo(circleLayer);

}

// create a layer control
const baseLayers = {
    "Default": defaultLayer,
    "Stadia": stadiaLayer
};

const overlays = {
    "Circles": circleLayer,
    "Tourist Spots": touristLayer
}

L.control.layers(baseLayers, overlays).addTo(map);