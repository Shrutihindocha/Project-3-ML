d3.select("#submit").on("click", ()=>{
    var country = d3.select("#country").node().value
    var num_periods = d3.select("#num_periods").node().value

     
    d3.json(`/api/predict/${country}/${num_periods}`).then(data => {

        d3.json(`/api/cleaned/${country}`).then(cleaned_data =>{
        
            // html = ""
            // data.prediction1.forEach(prediction => {
            //     html += `<li>${prediction}</li>`
            // })
            console.log(cleaned_data)
            StartYear = 2020;
            var predictedLayerXData = [];
            for (let i = 0; i < num_periods; i++) {
                predictedLayerXData.push(StartYear+i)
            };
            // console.log(predictedLayerXData)
            var predictedLayerYData1 = data.prediction1;
            var trainLayerXData = Object.values(cleaned_data.Year);
            var trainLayerYData1 = Object.values(cleaned_data.GDI);

            var predictedLayer1 =
                {
                    x: predictedLayerXData,
                    y: predictedLayerYData1,
                    mode: 'lines',
                    name: 'Predicted'
                }
            ;
            var trainLayer1 ={
                    x: trainLayerXData,
                    y: trainLayerYData1,
                    mode: 'lines',
                    name: 'Trained'
                };
            var layout1 = {
                            title: `GDI Forecast`,
                            yaxis: {
                                        title: `GDI Index`,
                                        range: [0,1]
                                    },
                            xaxis: {
                                title: `Year`
                            }
                        };
            var plotData1 = [predictedLayer1, trainLayer1];
            
            Plotly.newPlot('timeSeries1', plotData1, layout1);
            
            // GDI Female

            var predictedLayerYData2 = data.prediction2;
            var trainLayerYData2 = Object.values(cleaned_data.HDI_female);

            var predictedLayer2 =
                {
                    x: predictedLayerXData,
                    y: predictedLayerYData2,
                    mode: 'lines',
                    name: 'Predicted'
                }
            ;
            var trainLayer2 ={
                    x: trainLayerXData,
                    y: trainLayerYData2,
                    mode: 'lines',
                    name: 'Trained'
                };
            var layout2 = {
                            title: `HDI female Forecast`,
                            yaxis: {
                                        title: `HDI female Index`,
                                        range: [0,1]
                                    },
                            xaxis: {
                                title: `Year`
                            }
                        };
            var plotData2 = [predictedLayer2, trainLayer2];
            
            Plotly.newPlot('timeSeries2', plotData2, layout2);

            // GDI Male

            // console.log(predictedLayerXData)
            var predictedLayerYData3 = data.prediction3;
            var trainLayerYData3 = Object.values(cleaned_data.HDI_male);

            var predictedLayer3 =
                {
                    x: predictedLayerXData,
                    y: predictedLayerYData3,
                    mode: 'lines',
                    name: 'Predicted'
                }
            ;
            var trainLayer3 ={
                    x: trainLayerXData,
                    y: trainLayerYData3,
                    mode: 'lines',
                    name: 'Trained'
                };
            var layout3 = {
                            title: `HDI male Forecast`,
                            yaxis: {
                                        title: `HDI male Index`,
                                        range: [0,1]
                                    },
                            xaxis: {
                                title: `Year`
                            }
                        };
            var plotData3 = [predictedLayer3, trainLayer3];
            
            Plotly.newPlot('timeSeries3', plotData3, layout3);

    
            // d3.select("#output").html(html)
        });
    });
});