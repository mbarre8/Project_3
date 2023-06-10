import pandas as pd
import numpy as np
import sqlite3
import random

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy import extract

from flask import Flask, jsonify, render_template



#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///HomeHealthAgenciesDB.db")

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

@app.route("/api/ownership")
def ownerships():

    session = Session(engine)

    results = session.query(Cms_data.Type_of_Ownership, func.avg(Cms_data.Quality_of_Care_Rating)).group_by(Cms_data.Type_of_Ownership).order_by(func.avg(Cms_data.Quality_of_Care_Rating).desc()).all()

    results = [{'category': row[0], 'value': row[1]} for row in results]
    print(results)


  
    session.close()

    return jsonify(results)
# -------------------------------------------------------------------------------
@app.route("/api/adl")
def adl():

    session = Session(engine)

    sel2 = [
        Cms_data.Type_of_Ownership,
        func.avg(Cms_data.Perceived_Walking_Improvement),
        func.avg(Cms_data.Perceived_Bed_Mobility_Improvement),
        func.avg(Cms_data.Perceived_Bathing_Improvement)
    ]

    adl_averages = session.query(*sel2).\
        group_by(Cms_data.Type_of_Ownership).\
        order_by(Cms_data.Type_of_Ownership).all()

    # Convert the query results to a list of dictionaries
    results = []
    for row in adl_averages:
        result = {
            'type_of_ownership': row[0],
            'avg_walking_improvement': row[1],
            'avg_bed_mobility_improvement': row[2],
            'avg_bathing_improvement': row[3]
        }
        results.append(result)
    session.close()

    return jsonify(results)

# -------------------------------------------------------------------------------
@app.route("/api/admissions")
def admissions():

    session = Session(engine)

    sel2 = [
        Hospitalization_data.Type_of_Ownership,
        func.avg(Hospitalization_data.Home_Health_Patients_Admitted_to_Hospital),
        func.avg(Hospitalization_data.Home_Health_Patients_ER_Visits_without_Admission)
    ]

    admission_averages = session.query(*sel2).\
        group_by(Hospitalization_data.Type_of_Ownership).\
        order_by(Hospitalization_data.Type_of_Ownership).all()

    # Convert the query results to a list of dictionaries
    results = []
    for row in admission_averages:
        result = {
            'type_of_ownership': row[0],
            'avg_patients_admitted': row[1],
            'avg_patients_ER_visit': row[2]
        }
        results.append(result)
    session.close()

    return jsonify(results)

# @app.route("/api/date")
# def date():

#     session = Session(engine)

#     results = session.query(
#         Cms_data.Quality_of_Care_Rating,
#         extract('year', Cms_data.Date_Certified)
#     ).group_by(Cms_data.Date_Certified).order_by(Cms_data.Date_Certified).all()

#     sample_size = 500
#     if len(query_result) > sample_size:
#         query_result = random.sample(query_result, sample_size)

#     ratings = [result[0] for result in results]
#     years = [result[1] for result in results]

#     data = {'ratings': ratings, 'years': years}

#     return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)

# -------------------------------------------------------------------------------


