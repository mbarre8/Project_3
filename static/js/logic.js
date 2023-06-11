

d3.json("/api/homehealth").then((data) => {

    console.log(data)
  
    // $(document).ready(function() {
    $('#example').DataTable( {
        data: data['table'],
        columns: [
            { title: "States" },
            { title: "Certification Number" },
            { title: "Name of Agency" },
            { title: "City" },
            { title: "Zip"},
            { title: "Ownership" },
            { title: "Rating" },
        ]
    } );
  
  });
  // -------------------------------------------------------------------------------
  
  d3.json("/api/ownership").then((data) => {
      console.log(data)

    const categories = data.map(item => item.category);
    const values = data.map(item => item.value);

      var trace1 = {
        type: 'bar',
        x: categories,
        y: values,
        marker: {
            color: '#7FB3D5',
        }
      };
      
      var data = [trace1];
      
      const layout = { 
        title: 'Average Quality of Rating by Owership Type'
      };
      
      var config = {responsive: true}
      
      Plotly.newPlot('bar', data, layout, config );
    
    });
  
  // -------------------------------------------------------------------------------

    d3.json("/api/adl").then((data) => {
      console.log(data)
      const ownershipTypes = data.map(item => item.type_of_ownership);
      const avgWalkingImprovement = data.map(item => item.avg_walking_improvement);
      const avgBedMobilityImprovement = data.map(item => item.avg_bed_mobility_improvement);
      const avgBathingImprovement = data.map(item => item.avg_bathing_improvement);
  
      // Create the data traces for the chart
      const traces = [
        {
          x: ownershipTypes,
          y: avgWalkingImprovement,
          type: 'bar',
          name: 'Walking Improvement',
          marker: {
            color: '#A99BF6',
        }
        },
        {
          x: ownershipTypes,
          y: avgBedMobilityImprovement,
          type: 'bar',
          name: 'Bed Mobility Improvement',
          marker: {
            color: '#9BC7F6',}
        },
        {
          x: ownershipTypes,
          y: avgBathingImprovement,
          type: 'bar',
          name: 'Bathing Improvement',
          marker: {
            color: '#F5D79E',}
        }
      ];
  
      // Set the layout for the chart
      const layout = {
        barmode: 'stack',
        title: "Improvement in Activities of Daily Living"
        // Define other layout options
      };
  
      // Create the chart
      Plotly.newPlot('Chart', traces, layout);
    });
   
      // -------------------------------------------------------------------------------

    d3.json("/api/admissions").then((data) => {
      console.log("data");
      const ownershipTypes = data.map(item => item.type_of_ownership);
      const avgPatientsAdmitted = data.map(item => item.avg_patients_admitted);
      const avgPatientsAdmittedER = data.map(item => item.avg_patients_ER_visit);
     
  
      // Create the data traces for the chart
      const traces = [
        {
          x: ownershipTypes,
          y: avgPatientsAdmitted,
          type: 'bar',
          name: 'Average Hospital Admission',
          marker: {
            color: '#9BC7F6',}
        },
        {
          x: ownershipTypes,
          y: avgPatientsAdmittedER,
          type: 'bar',
          name: 'Average ER Visit',
          marker: {
            color: '#F5D79E',}
        }
      ];
  
      // Set the layout for the chart
      const layout = {
        barmode: 'group',
        title: "Admission Rates"
        // Define other layout options
      };
  
      // Create the chart
      Plotly.newPlot('Chart2', traces, layout);
    });

       // ------------------------------------------------------------------------------
