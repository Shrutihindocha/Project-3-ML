d3.json("/about/api/data").then(data => {
    console.log(Object.values(data))

    var trace1 = {
        x: Object.values(data.Year),
        y: Object.values(data.GDI),
        mode: 'markers',
        type: 'scatter'
    };

    var data1 = [trace1];

    Plotly.newPlot('clusters', data1);

})