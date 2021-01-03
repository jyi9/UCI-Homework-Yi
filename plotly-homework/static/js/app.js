var samples = "";

d3.json("../../sample_data/samples.json").then((data) => {
    samples = data;
    // dropdown menu
    d3.select("#selDataset").selectAll("option")
        .data(data.metadata)
        .enter()
        .append("option")
        .classed(data.metadata.id, true)
        .html(function(d) {
            return d.id;
    });

    // bar graph
    var patientID = data.names[0];
    var index = data.samples.map((e) => e.id).indexOf(patientID);

    var x = [];
    var y = [];
    var text = [];

    for (var i = 0; i < 10; i++) {
        x.push(data.samples[index].sample_values[i]);
        y.push(data.samples[index].otu_ids[i]);
        text.push(data.samples[index].otu_labels[i]);
    };

    var trace1 = {
        x: x.reverse(),
        y: y.reverse().map((id) => `OTU ${id}`),
        type: 'bar',
        orientation: 'h',
        text: text.reverse()
    };

    var woop = [trace1];
    var layout = {
        title: `Top Ten OTUs found in Patient ${patientID}`,
        xaxis: {title: "Sample Values"},
        yaxis: {title: "OTU IDs"}
    };

    Plotly.newPlot("bar", woop, layout);

    // initialized bubble chart
    var bubbleX = data.samples[index].otu_ids;
    var bubbleY = data.samples[index].sample_values;
    var sizes = data.samples[index].sample_values;
    var colors = data.samples[index].otu_ids;
    var bubbleText = data.samples[index].otu_labels;
    
    var trace2 = {
        x: bubbleX,
        y: bubbleY,
        mode: 'markers',
        text: bubbleText,
        marker: {
            size: sizes,
            color: colors
        }
    };

    var data2 = [trace2];

    var layout2 = {
        title: `Bubble Chart of OTUs found in Patient ${patientID}`,
        xaxis: {title: "OTU ID"},
        yaxis: {title: "Sample Values"}
    };
    
    Plotly.newPlot("bubble", data2, layout2);

    // display individual's demographic information
    var informationPanel = d3.select("#sample-metadata");
    var information = data.metadata[index];
    
    Object.entries(information).forEach(([key, value]) => {
        informationPanel
            .append("p")
            .html(`${key}: ${value}`)
    });

});


function optionChanged(patientID) {
    console.log(patientID);
    
    
    var patientID = patientID;
    var index = samples.samples.map((e) => e.id).indexOf(patientID);

    var informationPanel = d3.select("#sample-metadata");
    var information = samples.metadata[index];
    
    var numOTUs = samples.samples[index].otu_ids.length;

    var x = [];
    var y = [];
    var text = [];
    var bubbleX = samples.samples[index].otu_ids;
    var bubbleY = samples.samples[index].sample_values;
    var updateMarker = {marker: 
        {size: samples.samples[index].sample_values, 
        color: samples.samples[index].otu_ids}};
    var bubbleText = samples.samples[index].otu_labels;

    x = x.reverse();
    y = y.reverse().map((id) => `OTU ${id}`);
    text = text.reverse();

    var updateBar = {
        title: `Top Ten OTUs found in Patient ${patientID}`
    }
    var updateBubble = {
        title: `Bubble Chart of OTUs found in Patient ${patientID}`
    }

    d3.selectAll("p").remove();
    Object.entries(information).forEach(([key, value]) => {
        informationPanel
            .append("p")
            .text(`${key}: ${value}`)
    });
};
