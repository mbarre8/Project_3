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


# Data
@app.route("/api/homehealth")
def hh_grid():

    session = Session(engine)

    results = session.query(Cms_data.State, Cms_data.CMS_Certification_Number, Cms_data.Provider_Name, Cms_data.City, Cms_data.ZIP, Cms_data.Type_of_Ownership,Cms_data.Quality_of_Care_Rating).all()

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

    sel3 = [
        Hospitalization_data.Type_of_Ownership,
        func.avg(Hospitalization_data.Home_Health_Patients_Admitted_to_Hospital),
        func.avg(Hospitalization_data.Home_Health_Patients_ER_Visits_without_Admission)
    ]

    admission_averages = session.query(*sel3).\
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
# -------------------------------------------------------------------------------
@app.route("/api/ownershippie")
def ownershippie():

    session = Session(engine)

    results = session.query(Cms_data.Type_of_Ownership, func.count(Cms_data.Type_of_Ownership)).group_by(Cms_data.Type_of_Ownership).all()
    
    results2 = []
    for row in results:
        label = row[0]
        value = row[1]
        results2.append({"label": label, "value": value})


    return jsonify(results2)
# -------------------------------------------------------------------------------
@app.route("/api/dashboard")
def dashboard():

    session = Session(engine)

    results = session.query(Cms_data.State, Cms_data.CMS_Certification_Number, Cms_data.Provider_Name, Cms_data.City, Cms_data.ZIP, Cms_data.Type_of_Ownership, Cms_data.Nursing_Care_Services, Cms_data.Physical_Therapy_Services,Cms_data.Occupational_Therapy_Services,Cms_data.Speech_Pathology_Services, Cms_data.Medical_Social_Service , Cms_data.Home_Health_Aide_Services, Cms_data.Quality_of_Care_Rating, Cms_data.Date_Certified, Cms_data.Perceived_Timely_Care,Cms_data.Perceived_Walking_Improvement,Cms_data.Perceived_Bed_Mobility_Improvement,Cms_data.Perceived_Bathing_Improvement,Cms_data.Change_in_skin_Integrity,Cms_data.Physician_Medication_Orders_Addressed_in_a_Timely_Manner, Cms_data.One_or_More_Falls_with_Major_Injury).all()
    results = [list(r) for r in results]

    results1 = session.query(States.State).all()
    results1 = [row.State for row in results1]

    results2 = session.query(Hospitalization_data.State, Hospitalization_data.CMS_Certification_Number, Hospitalization_data.Provider_Name, Hospitalization_data.Address, Hospitalization_data.City, Hospitalization_data.ZIP, Hospitalization_data.Type_of_Ownership, Hospitalization_data.Home_Health_Patients_Admitted_to_Hospital, Hospitalization_data.Home_Health_Patients_ER_Visits_without_Admission).all()
    results2= [list(h) for h in results2]

    data_results = {
        "CMS": results,
        "Admission": results2,
        "State": results1
    }
# Link CMS data to states
    linked_results_cms = []
    for state in results1:
        state_data_cms = {
            "State": state,
            "Data": [r for r in results if r[0] == state]
        }
        linked_results_cms.append(state_data_cms)

    # Link Admission data to states
    linked_results_admission = []
    for state in results1:
        state_data_admission = {
            "State": state,
            "Data": [h for h in results2 if h[0] == state]
        }
        linked_results_admission.append(state_data_admission)

    data_results["LinkedResultsCMS"] = linked_results_cms
    data_results["LinkedResultsAdmission"] = linked_results_admission

    session.close()

    return jsonify(data_results)


if __name__ == '__main__':
    app.run(debug=True)

# -------------------------------------------------------------------------------


