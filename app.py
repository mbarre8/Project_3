import numpy as np
import sqlite3

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template



#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///HomeHealthDB.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

print(Base.classes.keys())

# Save reference to the table
Cms_data = Base.classes.cms_data
States = Base.classes.states
Ownership = Base.classes.ownership
Hospitalization_data= Base.classes.hospitalization_data

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/data")
def data():

    return render_template("data.html")

@app.route("/analysis")
def states():
    return render_template("analysis.html")

# @app.route("/")
# def index():
#     return render_template('index.html', data=data)


# Datatable
@app.route("/api/homehealth")
def hh_grid():

    session = Session(engine)

    results = session.query(Cms_data.State, Cms_data.CMS_Certification_Number, Cms_data.Provider_Name, Cms_data.City, Cms_data.Type_of_Ownership,Cms_data.Quality_of_Care_Rating).all()

    results = [list(r) for r in results]
   
    table_results = {
        "table": results
    }

    session.close()

    return jsonify(table_results)

# -------------------------------------------------------------------------------
# Charts
@app.route("/api/ownership")
def ownerships():

    session = Session(engine)

    results = session.query(Cms_data.Type_of_Ownership, func.avg(Cms_data.Quality_of_Care_Rating)).group_by(Cms_data.Type_of_Ownership).order_by(func.avg(Cms_data.Quality_of_Care_Rating).desc()).all()

    results = [{'category': row[0], 'value': row[1]} for row in results]
    print(results)


  
    session.close()

    return jsonify(results)
# @app.route("/api/HomeHealthAgencies")
# def homehealth_grid():

#     session = Session(engine)

#     results = session.query(cms_data.State, cms_data.Provider_Name, cms_data.City, cms_data.Date_Certified, cms_data.Quality_of_Care_Rating).all()

#     results = [list(r) for r in results]

#     table_results = {
#         "table": results
#     }

#     session.close()

#     return jsonify(table_results)

# @app.route("/data")
# def data():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)


#     # Query all passengers
#     results = session.query(hospitalization_data.Type_of_Ownership, func.avg(hospitalization_data.Home_Health_Patients_Admitted_to_Hospital)).group_by(hospitalization_data.Type_of_Ownership).order_by(func.avg(hospitalization_data.Home_Health_Patients_Admitted_to_Hospital).desc()).all()
#     print(results)
#     results = [list(r) for r in results]

#     dic = {}
#     for each in results:
#         dic[each[0]] = each[1]
#     session.close()
 
#     return jsonify(dic)

   

if __name__ == '__main__':
    app.run(debug=True)
