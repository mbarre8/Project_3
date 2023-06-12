
//        // Use the D3 library to Fetch the JSON data and console log it
d3.json("/api/dashboard").then((data) =>{
    console.log("Data: ", data)
  });
  
  function HHS(sample){
    d3.json("/api/dashboard").then((data)=>{
    
  let first_state = data.CMS.filter(entry => entry[0] == sample);

  console.log(first_state);

  let quality_of_care_ratings = [];
  let dates_certified = [];
  let walkingImprovements = [];
  let bedMobilityImprovements = [];
  let bathingImprovements = [];
  let changeInSkin = [];
  let fallInjury = [];

  first_state.forEach(array => {
    quality_of_care_ratings.push(array[12]);
    dates_certified.push(array[13]);
    walkingImprovements.push(array[15]);
    bedMobilityImprovements.push(array[16]);
    bathingImprovements.push(array[17]);
    changeInSkin.push(array[18]);
    fallInjury.push(array[20]);

    
  });
   
  console.log(quality_of_care_ratings);
  console.log(dates_certified);
  
  let trace = {
    x: dates_certified,
    y: quality_of_care_ratings,
    mode: 'markers+lines',
    name: 'Quality of Care Rating'
  };
  
  let layout1 = {
    title: '<b>Quality of Care Ratings by Date Certified<b>',
    xaxis: { title: 'Date Certified' },
    yaxis: { title: 'Quality of Care Rating' }
  };

  let data1= [trace];

  Plotly.newPlot('line', data1, layout1); 

  // Iterate through each array and extract bathing and walking improvements

  let avgWalkingImprovements = calculateAverage(walkingImprovements);
  let avgBedMobilityImprovements = calculateAverage(bedMobilityImprovements);
  let avgBathingImprovements = calculateAverage(bathingImprovements);
  let avgChangeInSkin = calculateAverage(changeInSkin);
  let avgFallInjury = calculateAverage(fallInjury);
  let aveQualityOfCareRating = calculateAverage(quality_of_care_ratings);

  console.log('Average Walking Improvements:', avgWalkingImprovements);
  console.log('Average Bed Mobility Improvements:', avgBedMobilityImprovements);
  console.log('Average Bathing Improvements:', avgBathingImprovements);
  console.log('Average Change In Skin Integrity:', avgChangeInSkin);
  console.log('Average One or More Falls with Injury:', avgFallInjury);
  
  // Function to calculate the average of an array
  function calculateAverage(arr) {
    if (arr.length === 0) {
      return 0;
    }
    
    let sum = arr.reduce((acc, val) => acc + val);
    return sum / arr.length;
  }
  
  // Create the trace for the horizontal bar graph
  let data2 = [
    {
      y: ['Walking Improvements', 'Bed Mobility Improvement', 'Bathing Improvements', 'Change In Skin Integrity', 'One or More Falls with Injury'],
      x: [avgWalkingImprovements, avgBedMobilityImprovements, avgBathingImprovements, avgChangeInSkin, avgFallInjury],
      type: 'bar'
    }
  ];
  
  // Create the layout for the plot
  let layout2 = {
    title: '<b>Quality of care averages<b>',
    margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 100},
          bargap :0.05
        };

  Plotly.newPlot('bar', data2, layout2); 

  let trace3 = [
    	{
    		domain: { x: [0, 1], y: [0, 1] },
    		value: aveQualityOfCareRating,
    		title: { text: "<b>State Care Quality Average <b>" },
        type: "indicator",
    		mode: "gauge+number",
        gauge: {
          axis:{range: [null, 5] },
          steps: [
          { range: [0, 1], color: "#E5F9FF" },
          { range: [1, 2] , color: "#B8DBE6"},
          { range: [2, 3], color:  "#84C0D4"},
          { range: [3, 4], color: "#50A6C2" },
          { range: [4, 5], color: "#00688B" },
      
          ],
    	}}
    ];
    
    // specifying size and margins of chart
    let layout3 = { 
      width: 600,
      height: 500, 
      margin: { t: 0, b: 0 }
      };
    
    //plot gauge chart
    Plotly.newPlot('gauge', trace3, layout3);
  
  });
  }
  
  function HHSHosp(sample){
    d3.json("/api/dashboard").then((data)=>{
    
  let first_state1 = data.Admission.filter(entry => entry[0] == sample);

  console.log(first_state1);


  let hospital_admission = [];
  let ER_visits= [];

  first_state1.forEach(array => {
    hospital_admission.push(array[7]);
    ER_visits.push(array[8]);   
  });

  let trace4 = [
    {
      y: ['Hospital Admissions Rates', 'ER Visit Rates'],
      x: [hospital_admission, ER_visits],
      type: 'bar'
    }
  ];
  
  // Create the layout for the plot
  let layout4 = {
    title: '<b>Admission Percentages<b>',
    margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 100},
          bargap :0.05
        };

  Plotly.newPlot('bar2', trace4, layout4); 


});
}
  // function MetaData(sample) {
  //   d3.json("/api/dashboard").then((data)=>{
  
  // //create a variable from metadata list and print results
  // let metaData = data.metadata;
  //   console.log("Metadata: ", metaData);
  
  // // create a variable to pull first array in metadata list
  // let metaDataArray = metaData.filter(item =>item.id == sample);
  // let firstMetaDataArray = metaDataArray[0];
  // console.log("Current Metadata:", firstMetaDataArray);
  // // console.log(metaDataArray);
  
  // //Select the sample-metadata ID and append the first object with forEach function to get all key-value pairs from first metadata array entry
  // let demographicInfo= d3.selectAll("#sample-metadata");
  // demographicInfo.html(" ");
  // Object.entries(firstMetaDataArray).forEach(([k,v])=> {
  // demographicInfo.append("div").text(`${k}:${v}`);
  // });
  
  
  // //setting variables to locate wash frequency in each metadata array
  // let washFreq = metaDataArray.map(item =>item.wfreq);
  // let firstWashFreq = washFreq[0];
  // console.log("Wash Frequency for current ID: ", firstWashFreq);
  
  // //determine criteria for the graph
  // let trace3 = [
  // 	{
  // 		domain: { x: [0, 1], y: [0, 1] },
  // 		value: firstWashFreq,
  // 		title: { text: "<b>Belly Button Washing Frequency <b><br> Scrubs Per Week" },
  //     type: "indicator",
  // 		mode: "gauge+number",
  //     gauge: {
  //       axis:{range: [null, 9] },
  //       steps: [
  //       { range: [0, 1], color: "ivory" },
  //       { range: [1, 2] , color: "lightyellow"},
  //       { range: [2, 3], color:  "beige"},
  //       { range: [3, 4], color: "yellow" },
  //       { range: [4, 5], color: "yellowgreen" },
  //       { range: [5, 6], color: "olive" },
  //       { range: [6, 7], color: "lightgreen" },
  //       { range: [7, 8], color: "green" },
  //       { range: [8, 9], color: "darkgreen" },
  //       ],
       
       
  
  // 	}}
  // ];
  
  // // specifying size and margins of chart
  // let layout3 = { 
  //   width: 600,
  //   height: 500, 
  //   margin: { t: 0, b: 0 }
  //   };
  
  // //plot gauge chart
  // Plotly.newPlot('gauge', trace3, layout3);
  //   });
  // }
  
  function init() {
    
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    
    //create a variable from names list and print results
    d3.json("/api/dashboard").then((data) => {
      var StateId = Object.values(data.State);
      console.log("States: ", StateId);
  
    //ForEach Id name in variable sampleNames append results to drop down menu 
      StateId.forEach((state)=> {
      dropdownMenu.append("option").text(`${state}`).property("value", state);
      }); 
    
     // Initializes the page with a default ID with default bar, bubble graph, gauge chart and demographic info
    const stateOne = StateId[0];
    HHS(stateOne);
    HHSHosp(stateOne);
    console.log("State one:", stateOne);
  
  });
  }
  
  //create function to change between change all inputs with corresponding ID selected
  function optionChanged(newState){
    HHS(newState);
    HHSHosp(newState);
    }
  
  
  
    init();