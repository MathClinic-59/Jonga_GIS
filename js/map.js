// Initialize Map
var map = L.map('map').setView([-33.91799, 25.57007], 7);

// Basemaps
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3']
});

// GeoJSON Layers (Not added to map immediately)
var region_layer = L.geoJson(region, {
    style: { color: "red", weight: 1 },
    onEachFeature: function(f, l) { l.bindPopup("Region: " + f.properties.region); }
});

// GeoJSON road layer for South Africa
var road_zaf = L.geoJson(road_zaf, {
    style: { color: "orange", weight: 2 }
});

// GeoJSON region layer for South Africa
//var road_zaf = L.geoJson(road_zaf, {
   // style: { color: "purple", weight: 1 },
   // onEachFeature: function(f, l) { l.bindPopup("Region: " + f.properties.region); }
//});

var healthsite_layer = L.geoJson(healthfacility, {
    pointToLayer: function(f, latlng) {
        return L.circleMarker(latlng, { radius: 6, fillColor: "green", color: "#000", weight: 1, fillOpacity: 0.8 });
    }
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
    "Regions": region_layer,
    "Health Sites": healthsite_layer,
    "Railways": railway_layer,
    "South African Roads": road_zaf
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
