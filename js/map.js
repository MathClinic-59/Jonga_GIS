// Initialize Map
var map = L.map('map').setView([-33.91799, 25.57007], 7);

// Basemaps
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3']
});

// GeoJSON road layer for South Africa
var road_zaf = L.geoJson(road_zaf, {
    style: { color: "orange", weight: 2 }
});

 // Add water_areas GEOJSON layer
var water_zaf = L.geoJson(water_zaf, {
    style:{ color: "blue", weight: 3},

});

var railway_layer = L.geoJson(railway, {
    style: { color: "orange", weight: 2 }
});

// WMS Layers from local GeoServer
var river_wms = L.tileLayer.wms("http://localhost:8080/geoserver/African_geospatial/wms", {
    layers: 'African_geospatial:rivers',
    format: 'image/png',
    transparent: true
});

// Layer Control Objects
var baseLayers = {
    "OpenStreetMap": osm,
    "Satellite": googleSat
};

var overlays = {
    "South African Roads": road_zaf,
    "South African Water Bodies": water_zaf
};

// Add the Layer Control Panel
L.control.layers(baseLayers, overlays, {
    collapsed: true, // Keep it as a small icon until hovered
    position: 'topright'
}).addTo(map);

// Coordinate Tracker
map.on("mousemove", function(e) {
    document.getElementById("coordinate").innerHTML = 
        `Lat: ${e.latlng.lat.toFixed(4)} | Lng: ${e.latlng.lng.toFixed(4)}`;
});

// Add Scale
L.control.scale().addTo(map);
