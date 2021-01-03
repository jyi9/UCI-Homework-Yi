function init() {
	const data = d3.json("../data/samples.json").then( (data) => {
		const sample_data = data.samples;
        const sample_ids = [];
        const metadata_data = data.metadata;
        
		for(const sample of sample_data) {
			sample_ids.push(sample.id)
		}
		d3.select("#selDataset").selectAll('myOptions').data(sample_ids).enter().append('option').text(function(d) {return d; }).attr("value", function(d) {return d; });
		var selected_id = 944;

		var selected_sample = find_sample_by_id(sample_data, selected_id);

		var y_labels = [];
		for(const label of selected_sample.otu_ids.slice(0,10).reverse()){
			y_labels.push(`OTU ${label}`);
		}
		var plot_data = [{
			type: 'bar',
			x: selected_sample.sample_values.slice(0,10).reverse(),
			y: y_labels,
			text: selected_sample.otu_labels.slice(0,10).reverse(),
			orientation: 'h'
		}];
		
		
		var layout = {
			title: `Top 10 OTU for Patient ID: ${selected_id}`,
			yaxis: {
				type: "category"
			}
		}
		var CHART = d3.selectAll("#plot1").node();
        Plotly.newPlot(CHART, plot_data, layout);
        
        var CHART = d3.selectAll("#plot1").node();
        var CHART2 = d3.selectAll("#plot2").node();
        Plotly.newPlot(CHART, plot_data, layout);
        var bubbleX = selected_sample.otu_ids;
        var bubbleY = selected_sample.sample_values;
        var sizes = selected_sample.sample_values;
        var colors = selected_sample.otu_ids;
        var bubbleText = selected_sample.otu_labels;
        
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
            title: `Bubble Chart of OTUs found in Patient ${selected_id}`,
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Sample Values"}
        };
        
        Plotly.newPlot(CHART2, data2, layout2);
        var patientInfo = find_sample_by_id(metadata_data, selected_id)
        var infoPanel = d3.select("#sample-metadata").node();
        var info = patientInfo;
        
        

        infoPanel.textContent = ""

        var infoString = ""
        Object.entries(patientInfo).forEach( ([key,value]) => {
            infoString += `${key}: ${value} \n`;
        });

        infoPanel.append(infoString);

        


 

	});
	

}

function find_sample_by_id(samples, id){
	for(const sample of samples){
		if(sample.id == id){
			return sample
		}
	}
}

d3.selectAll("body").on("change",updatePlotly); 

function updatePlotly() {
	const data = d3.json("samples.json").then( (data) => {
        const sample_data = data.samples;
        const metadata_data = data.metadata;


		var selected_id = d3.select("#selDataset").node().value;

		var selected_sample = find_sample_by_id(sample_data, selected_id);

		var y_labels = [];
		for(const label of selected_sample.otu_ids.slice(0,10).reverse()){
			y_labels.push(`OTU ${label}`);
		}
		var plot_data = [{
			type: 'bar',
			x: selected_sample.sample_values.slice(0,10).reverse(),
			y: y_labels,
			text: selected_sample.otu_labels.slice(0,10).reverse(),
			orientation: 'h'
		}];
		
		var layout = {
			title: `Top 10 OTU for Patient ID: ${selected_id}`,
			yaxis: {
				type: "category"
			}
		}
        var CHART = d3.selectAll("#plot1").node();
        var CHART2 = d3.selectAll("#plot2").node();
        Plotly.newPlot(CHART, plot_data, layout);
        var bubbleX = selected_sample.otu_ids;
        var bubbleY = selected_sample.sample_values;
        var sizes = selected_sample.sample_values;
        var colors = selected_sample.otu_ids;
        var bubbleText = selected_sample.otu_labels;
        
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
            title: `Bubble Chart of OTUs found in Patient ${selected_id}`,
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Sample Values"}
        };
        
        Plotly.newPlot(CHART2, data2, layout2);
        var patientInfo = find_sample_by_id(metadata_data, selected_id)
        var infoPanel = d3.select("#sample-metadata").node();
        var info = patientInfo;
        
        

        infoPanel.textContent = ""

        var infoString = ""
        Object.entries(patientInfo).forEach( ([key,value]) => {
            infoString += `${key}: ${value} \n`;
        });

        infoPanel.append(infoString);

        


    });}
        
    
  
    
init();

