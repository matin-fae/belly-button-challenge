let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
function init() {
    //define drop-down button
        //id found using inspect or html code provided
    let drop_choice = d3.select("#selDataset");
    //read in dataset with d3
    d3.json(url).then((data) => {
        //for loop to populate drop-down
        let names = data.names;
        for (var x = 0; x < names.length; x++){
            //console.log(names[x]);
            drop_choice.append("option").property("value", names[x]).text(names[x]);
        };
    //barbel = bar+bubble
    barble(names[0])
    metadata(names[0])
    });
}
//define properties of charts
function barble(subject){
    d3.json(url).then((data) => {
    let subjects = data.samples.filter(subjectObj => subjectObj.id == subject);
    let info = subjects[0];
    let values = info.sample_values;
    let ids = info.otu_ids;
    let labels = info.otu_labels;
   
    var bar_data = [{
      type: "bar",
      orientation: "h",
      x: values.slice(0,10).reverse(),
      y: ids.slice(0,10).map(otuID => "OTU " + otuID).reverse(),
      text: labels.slice(0,10).reverse()
    }];
    var bar_vis = {
      title: "Top 10 Bacteria Present",
      margin: 20
    };
    
    Plotly.newPlot("bar", bar_data, bar_vis);

    var bubble_data = [{
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          color: ids,
          size: values
        }
      }];
      var bubble_vis = {
        title: "Bacteria Count per Culture",
        margin: 0,
        hovermode: "closest",
        xaxis: { title: "Bacteria Culture (OTU) ID" },
        margin: 30
        
      };
      
    Plotly.newPlot("bubble", bubble_data, bubble_vis);
    });
  }
//pull stats and fill demographic info (sample-metadata) div
function metadata(demo){
  //define demographic box
    //id found using inspect or html code provided
    let panel_body = d3.select("#sample-metadata")

    d3.json(url).then((data) => {
        let demos = data.metadata.filter(demoObj => demoObj.id == demo);
        let sub_demos = demos[0];
        /*let id = sub_demos.id;
        let ethnicity = sub_demos.ethnicity;
        let gender = sub_demos.gender;
        let age = sub_demos.age;
        let location = sub_demos.location;
        let bb = sub_demos.bb;
        let wfreq = sub_demos.wfreq;*/

        //clear html of previous results
        panel_body.html("")
        //console.log(sub_demos[1])
        for (d in sub_demos){
            //
            panel_body.append("h6").text(d + ": " + sub_demos[d]);
            //console.log(d)
        };
    });

};
//load new selection data
function optionChanged(newSample) {
    barble(newSample);
    metadata(newSample);
  }

init();


