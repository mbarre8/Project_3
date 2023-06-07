-- Delete the table
DROP TABLE states_id;

-- Create a new table for states
CREATE TABLE states_id (
  states_id VARCHAR(15) PRIMARY KEY,
  State VARCHAR(5) UNIQUE NOT NULL 
);

--show data in ownership table
SELECT * FROM states_id;

DROP TABLE ownership_id;

-- Create a new table ownership_id
CREATE TABLE ownership_id (
  ownership_id VARCHAR(17) PRIMARY KEY ,
  Type_of_Ownership VARCHAR(55) NOT NULL 
);

--show data in ownership_id table
SELECT * FROM ownership_id;

DROP TABLE hospitalization_data;

-- Create a new table hospitalization_data
CREATE TABLE hospitalization_data (
  State VARCHAR(2) PRIMARY KEY,
  CMS_Certification_Number INT NOT NULL,
  Provider_Name VARCHAR(70) NOT NULL,
  Address VARCHAR(50) NOT NULL,
  City VARCHAR(20) NOT NULL,
  ZIP INT NOT NULL,
  Type_of_Ownership VARCHAR(70) NOT NULL,
  Home_Health_Patients_Admitted_to_Hospital FLOAT(5) NOT NULL,
  Home_Health_Patients_ER_Visits_with_Admission FLOAT(5) NOT NULL,
  ownership_id VARCHAR (15) NOT NULL
);

--show data in hospitalization_data table
SELECT * FROM hospitalization_data;

DROP TABLE cms_data;

-- Create a new table hospitalization_data
CREATE TABLE cms_data (
  State VARCHAR(2) PRIMARY KEY,
  CMS_Certification_Number INT NOT NULL,
  Provider_Name VARCHAR(70) NOT NULL,
  Address VARCHAR(50) NOT NULL,
  City VARCHAR(20) NOT NULL,
  ZIP INT NOT NULL,
  Type_of_Ownership VARCHAR(70) NOT NULL,
  Nursing_Care_Services VARCHAR(5) NOT NULL,
  Physical_Therapy_Services VARCHAR(5) NOT NULL,
  Occupational_Therapy_Services VARCHAR(5) NOT NULL,
  Speech_Pathology_Services VARCHAR(5) NOT NULL,
  Medical_Social_Service VARCHAR(5) NOT NULL,
  Home_Health_Aide_Services VARCHAR(5) NOT NULL,
  Date_Certified VARCHAR (10) NOT NULL,
  Quality_of_Care_Rating FLOAT(5) NOT NULL,
  Perceived_Timely_Care FLOAT(5) NOT NULL,
  Perceived_Walking_Improvement FLOAT(5) NOT NULL,
  Perceived_Bed_Mobility_Improvement FLOAT(5) NOT NULL,
  Perceived_Bathing_Improvement FLOAT(5) NOT NULL,
  Change_in_skin_Integrity FLOAT(5) NOT NULL,
  Physician_Medication_Orders_Addressed_in_a_Timely_Manner FLOAT(5) NOT NULL,
  One_or_More_Falls_with_Major_Injury FLOAT(5) NOT NULL,
  states_id VARCHAR (8) NOT NULL,
  ownership_id VARCHAR (15) NOT NULL
);

--show data in hospitalization_data table
SELECT * FROM cms_data;