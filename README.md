# Project_3

##Home Health Services Analysis

###Overview 

In the following project, we will be looking at home health services across the United States. Home health services are services provided at home to individuals with chronic illnesses or injury. In many cases using home health services is more cost efficient for an individual then going to a skilled nursing or long-term facilities to seek medical treatments. With home health services you can get medical care in the convenience of your own home.  Furthermore, we examine the impact these services have on an individuals’ quality of life. More specifically we will be looking at hospitalization rate when using these services, the influences these services have on activities of daily living and if ownership type of a home health agency impact patient outcomes. For example, how will the use of a government owned services vs private services impact quality of life and service satisfaction.

###Data Source

For this project we obtained our dataset from data.cms.gov. The direct link to the data set we used for the project is https://data.cms.gov/provider-data/dataset/6jpm-sxkc. This data was published in 2023 and is a public dataset. The data focuses on key measurable summaries that CMS has chosen to focus on for the year and the data is collected via patient assessment documentation and insurance claims. 


###Audience

Our goal for this project is to build an interactive page to assist any individuals and families looking to use home health services.


###Data Cleaning

We used the extract, transform and load process to clean and load the data into a database. The following dataset contained many records and some rows containing missing information. We cleaned the data set by keeping columns pertaining to our analysis and creating four csv files, two of which are join tables. We split the data into two main csv files to reduce the number of empty fields needing to be dropped and to keep the data set as whole as possible. Some python libraries used to execute the process are pandas, numpy and datetime.  Once we had our four CSV files, we created a schema and ERD. Then we created an SQLite database, inserted the schema, and imported the CSV files into the database. Once the database was created, we used python and sqlachlemy to read the database and verify all information was inputted correctly. Next, we analyzed the data and created some queries.


###Flask app

After creating the database, and verifying that it is reading correctly, we created a flask app and made sure there is a connection between the flask app and the database. Then, we set three different flask app routes and used the render template function to return the three different html pages we created for this project. From here we also created various app routes to import the queries created in python for data visualizations.


###HTML

In the HTML pages we connected our CSS file and JavaScript files with scripts to read libraries such as plotly, jquery, bootstrap and d3 which are used in our JavaScript code or as styling. We created a top navigation bar with a link to the three html pages and some headers. We used ids in the div tags which are pointing to the data visualizations created in the JavaScript file.


###CSS

We used the CSS file to style the header and navigation tool bar at the top of the page. 

###JavaScript

In the JavaScript file we took the jsonify queries in the flask app route and used the d3 library to read the data and start plotting the graphs using the plotly library. Once we were ready to plot the graph, we used the id created in the html page to indicate where the visualization should go. 

###Tools

####Back-end
•    Python (pandas, numpy, datetime)
•    Sqlite
•    sqlalchemy
•    Flask

####Front-end 
•    JavaScript (d3, jquery, bootstrap, plotly)
•    CSS
•    HTML



###Conclusion

In conclusion, we were able to build a connection with all the tools and have them interact with no errors. This project was robust, and we feel like should we have had more time we could create more meaningful analysis and focus more on the styling aspect of the project. With the analysis completed some conclusions drawn are the government owned home health services have greater emergency room visit rates and slight lower average for improvements in activity of daily living such as bed mobility, walking and bathing. Government owned home health agencies are a small percentage of the overall home health agencies provided in this data set. Therefore, the amount of people impacted is far less. But the downside is if you cannot afford private home health services or do not have access to voluntary nonprofit home health facility you are at a disadvantage.  There was no real correlation between the date a home health agency was certified and quality of care ratings. In addition, fall injuries and skin changes seem to overall have a low percentage across the board which is a good outcome for quality of life while using home health services. 

