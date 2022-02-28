from flask import Flask, render_template
import requests
import json
import joblib

# flask app setup
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/about/raw")
def raw():
    url_HDRO = "http://ec2-54-174-131-205.compute-1.amazonaws.com/API/HDRO_API.php/indicator_id=137906,136906,137006/year=1990,1995,2000,2005,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021"
    response_HDRO = requests.get(url_HDRO)
    # print(f"HDRO: {response_HDRO}")

    raw_data = response_HDRO.json()

    return raw_data

# Route to the clean data
@app.route("/about/data")
def data():
    with open('./Data/data_final.json') as json_file:
        cleaned_data = json.load(json_file)
    return cleaned_data

@app.route("/results")
def results():
    return render_template("results.html")

@app.route("/api/predict/<country>/<num_periods>")
def prediction(country,num_periods): 
    model = joblib.load(f"models/{country}.sav")
    forecast = model.forecast(steps=int(num_periods)).tolist()
    return {"prediction": forecast}

if __name__ == "__main__":
    app.run(debug=True)