import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///HomeHealthDB.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
cms_data = Base.classes.cms_data
states = Base.classes.states
ownership = Base.classes.ownership
hospitalization_data= Base.classes.hospitalization_data

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"<h1>hello</h1>"
        f"/api/v1.0/Provider_names</br>")


@app.route("/api/v1.0/Provider_names")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(hospitalization_data.Type_of_Ownership, func.avg(hospitalization_data.Home_Health_Patients_Admitted_to_Hospital)).group_by(hospitalization_data.Type_of_Ownership).order_by(func.avg(hospitalization_data.Home_Health_Patients_Admitted_to_Hospital).desc()).all()

    session.close()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)



if __name__ == '__main__':
    app.run(debug=True)
