
//
function createBubbles(tag,interface,data) {
  // Reset chart
  d3.select(tag).select('g').remove();

  // Default Data
  if (data == undefined) {
    data = [["Mum", 49806], ["Dad", 48996], ["Grandparents", 14480], ["Uncle Bob", 8010], ["Aunt Cecile", 6438], ["DaughterA", 13150], ["DaughterB", 3892], ["Son2", 21732], ["Son3", 44], ["Big Fish", 92132],
            ["AcquaintanceA", 1]];
  }

  var radScale = d3.scaleSqrt()
      .domain([1, data[0][1]*1.1] )
      .range([5, 50]);
      var h = 500; var w = 500;

  var tooltip = d3.select(interface)
      .style('background', '#9099A2')
      .style('padding', '5px 15px')
      .style('border', '1px #33 solid')
      .style('border-radius', '5px')
      .style('opacity', '0');


  var colors = ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#bc80bd","#ccebc5","#ffed6f"];
  var svg = d3.select(tag)
      .style('height', h)
      .style('width', w)
      .style('min-width', w)
      .attr('font-size', 10)
      .attr('font-family', 'Montserrat')
      .attr('text-anchor', 'middle')
      .append('g')
      .attr('transform', 'translate(0,0)');

  var circles = svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('r', function(d) {
        return radScale(d[1]);
      })
      .attr('fill', function(d,i) {
        return colors[i%11];
      })
      .attr('cx', 300)
      .attr('cy', 300)
      .on('mouseover', function(d) {
        tooltip.transition()
          .style('opacity', 1)
        tooltip.html('Name: '+d[0]+'<br>Number of Messages: '+d[1]);
        d3.select(this).style('opacity', 0.5);
      })
      .on('mouseout', function(d) {
        tooltip.transition()
          .style('opacity', 0)
        d3.select(this).style('opacity', 1);
      });

    var simulation = d3.forceSimulation()
        .force('x', d3.forceX(w/2).strength(0.05))
        .force('y', d3.forceY(h/2).strength(0.05))
        .force('collide', d3.forceCollide(function(d) {
          return radScale(d[1]) +1;
        }));

    function ticked() {
      circles
        .attr('cx', function(d) {
          return d.x
        })
        .attr('cy', function(d) {
          return d.y
        });
    }

    simulation.nodes(data)
      .on('tick', ticked);
}
