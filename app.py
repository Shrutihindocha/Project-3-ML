from flask import Flask, render_template
import requests
import json
import joblib
import pandas as pd

# flask app setup
app = Flask(__name__)

@app.route("/index")
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

@app.route("/predictions")
def results():
    return render_template("predictions.html")

@app.route("/analysis")
def analysis():
    return render_template("analysis.html")

@app.route("/api/predict/<country>/<num_periods>")
def prediction(country,num_periods): 
    print(country, num_periods)
    model1 = joblib.load(f"Data/GDI_models/{country}.sav")
    forecast1 = model1.forecast(steps=int(num_periods)).tolist()
    model2 = joblib.load(f"Data/HDIf_models/{country}.sav")
    forecast2 = model2.forecast(steps=int(num_periods)).tolist()
    model3 = joblib.load(f"Data/HDIm_models/{country}.sav")
    forecast3 = model3.forecast(steps=int(num_periods)).tolist()
    return {"prediction1": forecast1, "prediction2": forecast2, "prediction3": forecast3}

@app.route("/api/cleaned/<country>")
def cleaned_country(country):
    df = pd.read_json("./Data/data_final.json")
    df_country = df[df["Country"]==country]
    json_country = df_country.to_json()
    return json_country

if __name__ == "__main__":
    app.run(debug=True)