from flask import Flask, render_template, jsonify
# from sqlalchemy import create_engine, inspect
# import pandas as pd

# flask app setup
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

# @app.route("/trends")
# def trends():

#     return render_template("trends.html")

# @app.route("/maps")
# def maps():
#     return render_template("maps.html")    

# @app.route("/api")
# def api():
#     # database setup
#     engine = create_engine("sqlite:///Data/sa_crime_new.sqlite")
#     conn = engine.connect()
#     data = pd.read_sql("SELECT * FROM main_df", conn)
#     json_data = data.to_json(orient='records')
    
#     return render_template("api.html", json_data=json_data)


# @app.route("/api/lev1")
# def api_lev1():
#     engine = create_engine("sqlite:///Data/sa_crime_new.sqlite")
#     conn = engine.connect()
#     data = pd.read_sql("SELECT offence1, count FROM main_df", conn)
#     return data.groupby(["offence1"]).sum()["count"].reset_index().to_json(orient="records")

# @app.route("/api/lev2")
# def api_lev2():
#     engine = create_engine("sqlite:///Data/sa_crime_new.sqlite")
#     conn = engine.connect()
#     data = pd.read_sql("SELECT offence2, count FROM main_df", conn)
#     return data.groupby(["offence2"]).sum()["count"].reset_index().to_json(orient="records")

# @app.route("/api/lev3")
# def api_lev3():
#     engine = create_engine("sqlite:///Data/sa_crime_new.sqlite")
#     conn = engine.connect()
#     data = pd.read_sql("SELECT offence3, count FROM main_df", conn)
#     return data.groupby(["offence3"]).sum()["count"].reset_index().to_json(orient="records")

# @app.route("/api/lev2/<offence_type>")
# def api_lev2_filter(offence_type):
#     engine = create_engine("sqlite:///Data/sa_crime_new.sqlite")
#     conn = engine.connect()
#     data = pd.read_sql("SELECT offence2, count FROM main_df", conn)
#     return data[data["offence2"]==offence_type].groupby(["offence2"]).sum()["count"].reset_index().to_json(orient="records")

# @app.route("/api/map")
# def map():
#     engine = create_engine("sqlite:///Data/sa_crime_new.sqlite")
#     conn = engine.connect()
#     data = pd.read_sql("SELECT locality, count, lat, long FROM main_df", conn)
#     return data.groupby(["locality","lat","long"]).sum()["count"].reset_index().to_json(orient="records")

if __name__ == "__main__":
    app.run(debug=True)