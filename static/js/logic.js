

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
            color: '#C8A2C8',
        }
      };
      
      var data = [trace1];
      
      var layout = { 
        title: 'Ownership Type Vs Ratings'
      };
      
      var config = {responsive: true}
      
      Plotly.newPlot('bar', data, layout, config );
    
    })
  

