d3.select("#submit").on("click", ()=>{
    var country = d3.select("#country").node().value
    var num_periods = d3.select("#num_periods").node().value

     
    d3.json(`/api/predict/${country}/${num_periods}`).then(data => {

        d3.json(`/api/cleaned/${country}`).then(cleaned_data =>{
        
            html = ""
            data.prediction.forEach(prediction => {
                html += `<li>${prediction}</li>`
            })

            console.log(Object.values(cleaned_data.Year))
            console.log(Object.values(cleaned_data.GDI))
            console.log([2020, 2021, 2022 ])
            // console.log(Object.values(cleaned_data.Year))
            // console.log(Math.max(Object.values(cleaned_data.Year)))


            var nPredictions = data.prediction.length

            
            var predictedLayer = [
                {
                    y: data.prediction,
                    x: [2020, 2021, 2022 ],
                    mode: 'lines'
                }
            ];
            var trainLayer = [
                {
                    x: [Object.values(cleaned_data.Year)],
                    y: [Object.values(cleaned_data.GDI)],
                    mode: 'lines'
                }
            ];
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