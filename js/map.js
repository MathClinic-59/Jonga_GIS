// Initialise map
var map = L.map('map').setView([-33.91799, 25.57007], 7);

 // Adding tile layer basemaps

// Add Osm tile layer map
 var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map); 



// Add googleStreets tile layer map
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});




// add marker
var marker = L.marker([7, -1.09]).addTo(map);

//Add layer styles

//region layer style
var region_style = {
color: "red",
opacity:0.3,
weight:1,
};

//SOU_boundaries layer style
var SOU_boundaries_style = {
    color: "gold",
    opacity:0.3,
    weight:1,
    };

//health facility layer style
 var healthfacility_style = {
     radius:8,
     fillColor:"green",
     color:"green",
     weight:1, 
 };

//railway layer style
var railway_style = {
    color: "orange",
    opacity:0.1,
    weight:5,
};


//region layer style
var airports_style = {
    radius:8,
    fillColor:"brown",   
    color: "blue",
    weight:1,
};

//water_lines layer style
var water_lines_style = {
    color: "darkblue",
    weight:1,
};

//water_areas style layer
var water_areas_style = {
    fillColor:"brown",
    color: "gold",
    opacity:0.1,
    weight:1,
};

//roads layer style
var roads_style = {
    color: "purple",
    weight:1,
};

//rail layer style
var rail_style = {
    color: "maroon",
    weight:2,
};

// Add GEOJSON layers
var region_layer = L.geoJson(region, {
    style:region_style,
    onEachFeature:function(feature,layer){

        //area = (turf.area(feature)/1000000).toFixed(3)
        //center_lng = turf.center(feature).geometry.coordinates[0].toFixed(2)
        //center_lat = turf.center(feature).geometry.coordinates[1].toFixed(2)


        label = `Name: ${feature.properties.region}<br>`
        //label += `Area: ${area}<br>`
        //label += `Center: lng : ${center_lng}, lat: ${center_lat} <br>`
        


        layer.bindPopup(label)
    }


})//.addTo(map); 

// Add GEOJSON layers
var SOU_boundaries_layer = L.geoJson(SOU_boundaries.json, {
    style:SOU_boundaries_style,
    onEachFeature:function(feature,layer){

        //area = (turf.area(feature)/1000000).toFixed(3)
        //center_lng = turf.center(feature).geometry.coordinates[0].toFixed(2)
        //center_lat = turf.center(feature).geometry.coordinates[1].toFixed(2)


        //label = `Name: ${feature.properties.region}<br>`
        //label += `Area: ${area}<br>`
        //label += `Center: lng : ${center_lng}, lat: ${center_lat} <br>`
        


        layer.bindPopup(label)
    }


})//.addTo(map); 

//healthsite layer
 var healthsite_layer = L.geoJson(healthfacility,{
    onEachFeature:function(feature,layer){

        label = `AMENITY: ${feature.properties.amenity}<br>`
        label += `AMENITY_NAME: ${feature.properties.name}<br>`
        label += `HEALTH_FACILITY: ${feature.properties.healthcare}<br>`
        


        layer.bindPopup(label)
    },
    pointToLayer:function(feature, latlng) {
    return L.circleMarker(latlng,healthfacility_style);
},


 })//.addTo(map);

// railway GEOJSON layer
var railway_layer = L.geoJson(railway,{
    style:railway_style,
    onEachFeature:function(feature,layer){

        label = `Railway_Name: ${feature.properties.NAME}<br>`
        label += `Railway_Status: ${feature.properties.RAILWAY}<br>`
        


        layer.bindPopup(label)
    }


})//.addTo(map);

// airports GEOJSON layer
var airports_layer = L.geoJson(airports,{
    style:region_style,
    onEachFeature:function(feature,layer){

        label = `Airports_Name: ${feature.properties.name}<br>`
        label += `Airports_Code: ${feature.properties.abbrev}<br>`
        


        layer.bindPopup(label)
    },
    pointToLayer:function(feature, latlng) {
    return L.circleMarker(latlng,airports_style);
}

})//.addTo(map);

// water_lines layer
var water_lines_layer = L.geoJson(water_lines, {
    style:water_lines_style,
    onEachFeature:function(feature,layer){

        label = `River_Name: ${feature.properties.NAM}<br>`
        

        layer.bindPopup(label)
    }


})//.addTo(map);



 // Add water_areas GEOJSON layer
var water_areas_layer = L.geoJson(water_areas, {
    style:water_areas_style,

})//.addTo(map);


// Add roads GEOJSON layer
var roads_layer = L.geoJson(roads, {
    style:roads_style,
    onEachFeature:function(feature,layer){

        label = `ROAD_DESCRIPTION: ${feature.properties.MED_DESCRI}<br>`
        label += `ROAD_ROUTE_DESCRITION: ${feature.properties.RTT_DESCRI}<br>`
        


        layer.bindPopup(label)
    }


})//.addTo(map);


// Add rails GEOJSON layer
var rails_layer = L.geoJson(rail, {
    style:rail_style,
    onEachFeature:function(feature,layer){

        label = `RAIL_STATUS: ${feature.properties.EXS_DESCRI}<br>`
        label += `RAIL_DESCRIPTION: ${feature.properties.FCO_DESCRI}<br>`
        


        layer.bindPopup(label)
    }


})//.addTo(map); 



// Adding WMS layers
var river_wms = L.tileLayer.wms("http://localhost:8080/geoserver/African_geospatial/wms",{
    layer:' African_geospatial:rivers',
    format: 'image/png',
    transparent: true,
    attribution: ""
})//.addTo(map);

var tree_cover_wms = L.tileLayer.wms("http://localhost:8080/geoserver/African_geospatial/wms",{
    layer:'African_geospatial:tree_cover',
    format: 'image/png',
    transparent: true,
    attribution: ""
})//.addTo(map);

var Railwayline_wms = L.tileLayer.wms("http://localhost:8080/geoserver/African_geospatial/wms", {
    layer:'African_geospatial:Railwayline',
    format: 'image/png',
    transparent: true,
    attribution: ""
})//.addTo(map);

var health_Facilities_wms = L.tileLayer.wms("http://localhost:8080/geoserver/African_geospatial/wms", {
    layer:'African_geospatial:health_Facilities',
    format: 'image/png',
    transparent: true,
    attribution: ""
}).addTo(map)


var airports_wms = L.tileLayer.wms("http://localhost:8080/geoserver/African_geospatial/wms", {
    layer:'African_geospatial:airports',
    format: 'image/png',
    transparent: true,
    attribution: ""
})//.addTo(map);


var pois_wms = L.tileLayer.wms("http://localhost:8080/geoserver/African_geospatial/wms", {
    layer:'African_geospatial:pois',
    format: 'image/png',
    transparent: true,
    attribution: ""
})//.addTo(map);


var Region_wms = L.tileLayer.wms("http://localhost:8080/geoserver/African_geospatial/wms", {
    layer:'African_geospatial:Region',
    format: 'image/png',
    transparent: true,
    attribution: ""
})//.addTo(map); 


//wms layers
var wms_Layers = {
    "Region": Region_wms ,
    "Pois": pois_wms,
    "Airports": airports_wms,
    "Health Facilities": health_Facilities_wms,
    "Rail Lines": Railwayline_wms,
    "Tree cover": tree_cover_wms,
    "Rivers": river_wms,
};



// Basemap layer group

var baseLayers = {
    "OpenStreetMap": osm,
    "Google Street map": googleStreets,
    "Google Hybrid": googleHybrid,
    "Google Satellite": googleSat,
    "Goolge Terrain": googleTerrain,
};

var geojson_layers = {
    "Region layer": region_layer,
    "Healthsite layer": healthsite_layer,
    "Railway layer": railway_layer,
    "airports layer": airports_layer,
    "Water-lines layer": water_lines_layer,
    "ZAF Layer": SOU_boundaries_layer,
};

var overlays = {
    "Region layer": region_layer,
    "Healthsite layer": healthsite_layer,
    "Railway layer": railway_layer,
    "airports layer": airports_layer,
    "Water-lines layer": water_lines_layer,
    "Water-areas layer": water_areas_layer,
    "Roads layer": roads_layer,
    "Rails layer": rails_layer,
    "Region": Region_wms ,
    "Pois": pois_wms,
    "Airports": airports_wms,
    "Health Facilities": health_Facilities_wms,
    "Rail Lines": Railwayline_wms,
    "Tree cover": tree_cover_wms,
    "Rivers": river_wms,
    "ZAF Layer": SOU_boundaries_layer,


    //"Roads": roadsLayer
};

//add a a layer group
//var cities = L.layerGroup([wms_Layers, baseLayers, aurora, golden]);

// Add layer control to map
L.control.layers(baseLayers, overlays, {collapsed:true}).addTo(map);

//adding basemaps
//layerControl.addBaseLayer(Region_wms, "Region");



// Add leaflet browser print control to map

L.control.browserPrint({position: 'topleft', title: 'Print ...'}).addTo(map);

// mouse move Coordinates
// coordinates on map
map.on("mousemove" ,function(e){
    
    $("#coordinate").html(`Lat:${e.latlng.lat.toFixed(3)} , Lng:${e.latlng.lng.toFixed(3)}`)
   

})





// Adding scale to map
L.control.scale().addTo(map);