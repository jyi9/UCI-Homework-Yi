// store api endpoint inside query URL
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(url, function(response) {
    createFeatures(response.features);

    var svg = d3.select(".legend")
        .append("svg")
        .attr("height", 10);

    var defs = svg.append("defs");

    var linearGradient = defs.append("linearGradient")
        .attr("id", "linear-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

    linearGradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "rgb(230, 53, 128)");

    linearGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "rgb(255, 0, 235");

    svg.append("rect")
        .attr("width", 300)
        .attr("height", 10)
        .style("fill", "url(#linear-gradient)");

});


function createFeatures(data) {
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<strong>Location: ${feature.properties.place}<strong>
        <br> Depth: ${feature.geometry.coordinates[2]}
        <br> Magnitude: ${feature.properties.mag}`)
    };
    var depths = [];
    data.forEach((feature) => {
        depths.push(feature.geometry.coordinates[2]);
    });
    var colorScale = d3.scaleLinear()
        .domain([Math.min(... depths), 90])
        .range(["rgb(182, 242, 76)", "rgb(237, 106, 106)"]);

    function createCircle(feature) {
        return L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            stroke: false,
            fillOpacity: 0.5,
            color: colorScale(feature.geometry.coordinates[2]),
            radius: feature.properties.mag * 2000

        })
    };

    var earthquakes = L.geoJSON(data, {
        pointToLayer: createCircle,
        onEachFeature: onEachFeature

    });

    createMap(earthquakes) 
};


function createMap(earthquakes) {

    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });
        
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });

    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap
    };

    var overlayMaps = {
        "Earthquakes": earthquakes
    };

    var myMap = L.map("mapid", {
        center: [39.8283, -98.5795],
        zoom: 5,
        layers: [darkmap, earthquakes]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);


    var legend = L.control({position: "bottomright"});

    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var limits = [-10, 500];

        var legendInfo = "<h3>Earthquake Depth</h3>" +
            "<div class=\"labels\">" +
                "<div class=\"min\">" + limits[0] + "</div>" +
                "<div class=\"max\">" + `${limits[limits.length - 1]}+` + "</div>" +
            "</div>";

        div.innerHTML = legendInfo;
        return div;
    };

    legend.addTo(myMap);
};