d3.select("#submit").on("click", ()=>{
    var country = d3.select("#country").node().value
    var num_periods = d3.select("#num_periods").node().value

     
    d3.json(`/api/predict/${country}/${num_periods}`).then(data => {

        d3.json(`/api/cleaned/${country}`).then(cleaned_data =>{
        
            html = ""
            data.prediction.forEach(prediction => {
                html += `<li>${prediction}</li>`
            })
            console.log(Object.values(cleaned_data.GDI));

            StartYear = 2020;
            var predictedLayerXData = [];
            for (let i = 0; i < num_periods; i++) {
                predictedLayerXData.push(StartYear+i)
            };
            // console.log(predictedLayerXData)
            var predictedLayerYData = data.prediction;
            var trainLayerXData = Object.values(cleaned_data.Year);
            var trainLayerYData = Object.values(cleaned_data.GDI);

            var predictedLayer =
                {
                    x: predictedLayerXData,
                    y: predictedLayerYData,
                    mode: 'lines'
                }
            ;
            var trainLayer ={
                    x: trainLayerXData,
                    y: trainLayerYData,
                    mode: 'lines'
                };
            var layout = {
                            title: `GDI Forecast`,
                            yaxis: {
                                        title: `GDI Index`
                                    },
                            xaxis: {
                                title: `Year`
                            }
                        };
            var plotData = [predictedLayer, trainLayer];
            
            Plotly.newPlot('timeSeries', plotData, layout);
            
            d3.select("#output").html(html)
        });
    });
});