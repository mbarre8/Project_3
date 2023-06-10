

d3.json("api/homehealth").then((data) => {

    console.log(data)
  
    // $(document).ready(function() {
    $('#example').DataTable( {
        data: data['table'],
        columns: [
            { title: "States" },
            { title: "Certification Number" },
            { title: "Name of Agency" },
            { title: "City" },
            { title: "Ownership" },
            { title: "Rating" },
        ]
    } );
  
  });

 
  
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

      var trace2 = {
        type: 'line',
        x: categories,
        y: 3.2492325402916347,
        marker: {
            color: '#E02D4E',
        },
        name: 'National Quality of Care Rating Average'
      };
      
      var data = [trace1];
      var data2 = [trace2];

      var layout = { 
        title: 'Average Quality of Rating by Owership Type'
      };
      
      var config = {responsive: true}
      
      Plotly.newPlot('bar', data, data2, layout, config );
    
    });
  


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

  //   d3.json("/api/bbox").then((data) => {
  //     console.log(data)
  //     const groupedData = {};

  //     // Group the data by Type_of_Ownership
  //     for (let i = 0; i < data.length; i++) {
  //       const item = data[i];
  //       if (!(item.Type_of_Ownership in groupedData)) {
  //         groupedData[item.Type_of_Ownership] = [];
  //       }
  //       groupedData[item.Type_of_Ownership].push(item.Quality_of_Care_Rating);
  //     }
  
  //     // Create an array of traces for each Type_of_Ownership
  //     const traces = [];
  //     for (const ownershipType in groupedData) {
  //       if (groupedData.hasOwnProperty(ownershipType)) {
  //         const trace = {
  //           x: [ownershipType],
  //           y: groupedData[ownershipType],
  //           type: 'box',
  //           name: ownershipType
  //         };
  //         traces.push(trace);
  //       }
  //     }
  
  //     // Set the layout options for the box plot
  //     const layout = {
  //       title: 'Box Plot',
  //       yaxis: {
  //         title: 'Quality of Care Rating'
  //       }
  //     };
  
  //     // Create the box plot
  //     Plotly.newPlot('boxplot', traces, layout);
  // });

    // d3.json("/api/certified_date").then((data) => {
    //   console.log(data)
    // const categories = data.map(item => item.category);
    // const values = data.map(item => item.value);

    //   var trace1 = {
    //     type: 'scatter',
    //     x: categories,
    //     y: values,
    //     marker: {
    //         color: '#7FB3D5',
    //     }
    //   };
      
    //   var data = [trace1];
      
    //   var layout = { 
    //     title: 'Certified Date Vs Ratings'
    //   };
      
    //   var config = {responsive: true}
      
    //   Plotly.newPlot('scatter', data, layout, config );
    
    // })