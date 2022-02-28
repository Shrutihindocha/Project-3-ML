d3.select("#submit").on("click", ()=>{
    var country = d3.select("#country").node().value
    var num_periods = d3.select("#num_periods").node().value

    d3.json(`/api/predict/${country}/${num_periods}`).then(data => {
        html = ""
        data.prediction.forEach(prediction => {
            html += `<li>${prediction}</li>`
        })
        
        d3.select("#output").html(html)
    })
})