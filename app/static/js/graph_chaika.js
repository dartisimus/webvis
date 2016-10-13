"use strict";

function graph_to_draw(clus) {

var address= ['../static/data/chaika_clus1.json', '../static/data/chaika_clus2.json'];      

var width = document.getElementById("chart").offsetWidth,
    height = document.getElementById("chart").offsetHeight,
    radius = 15;


var color = "blue";

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);
    
var force = d3.layout.force()
    .gravity(.03)
    .distance(150)
    .charge(-100)
    .size([width, height]);

    
d3.json(address[clus], function(json) {
  

  var link = svg.selectAll(".link")
      .data(json.links)
    .enter().append("line")
      .attr("class", "link")
    .style("stroke-width", function(d) { return Math.sqrt(d.weight); });

  var node = svg.selectAll(".node")
      .data(json.nodes)
    .enter().append("g")
      .attr("class", "node")
      .call(force.drag);

  node.append("circle")
      .attr("r", 6);

  node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.name });
    
  force
      .nodes(json.nodes)
      .links(json.links)
      .on("tick", tick)
      .start();

  function tick() {
      
    node.attr("cx", function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });
      
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
      
    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  };
});
}