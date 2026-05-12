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

const url = "https://api.data.gov.sg/v1/transport/taxi-availability";
const API_KEY = "enter-data-gov-";

async function loadData() {
    const response = await axios.get(url, {
        headers: {
            'X-Api-Key': API_KEY
        }
    });
    return response.data;
}

document.addEventListener("DOMContentLoaded", async function () {

    const taxiLayer = L.layerGroup();
    taxiLayer.addTo(map);
    drawTaxi(taxiLayer); // initial display
    setInterval(function () {
        drawTaxi(taxiLayer);
    }, 30000)

})

async function drawTaxi(taxiLayer) {
    taxiLayer.clearLayers();
    const taxiData = await loadData();
    console.log(taxiData.features[0].geometry.coordinates)
    for (let taxi of taxiData.features[0].geometry.coordinates) {
        const lat = taxi[1];
        const lng = taxi[0];
        const latLng = [lat, lng];
        L.marker(latLng).addTo(taxiLayer);
    }
}