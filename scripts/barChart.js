// Bar chart of messages sent per day

var dates = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var sent = [0, 0, 0, 0, 0, 0 ,0];
var received = [0, 0, 0, 0, 0, 0 ,0];

// Hover over effect
var tooltip = d3.select('.chart1').append('div')
    .style('position', 'absolute')
    .style('background', '#9099A2')
    .style('padding', '5px 15px')
    .style('border', '1px #33 solid')
    .style('border-radius', '5px')
    .style('opacity', '0');


function getDates(df) {
  for (let msg of df) {
    if (msg.sender == owner) {
      sent[msg.date.getDay()] += 1;
    }
    else {
      received[msg.date.getDay()] += 1;
    }
  }
}



function createSentDates(sent) {
  var svg = d3.select('.bar2');
  svg.selectAll('rect').remove();

  if (sent == undefined) {
    sent = [53607, 54175, 51804, 54995, 55299, 51122, 44973];
  }
  var w = 300; var h = 386; var padding = 10;
  var xscale = d3.scaleLinear()
      .domain([Math.min.apply(Math, sent) * 0.8, Math.max.apply(Math, sent)*1.1])
      .range([5, w]);

  var chart = svg.selectAll('rect')
      .data(sent)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', function(d,i) {
        return padding + i*(w/sent.length + padding);
      })
      .attr('width', d => xscale(d))
      .attr('height', 50)
      .attr('fill', '#6D7993')
      .on('mouseover', function(d) {
        tooltip.transition()
          .style('opacity', 1)
        tooltip.html(d)
          .style('left', (d3.event.pageX)+'px')
          .style('top', (d3.event.pageY) + 'px');
        d3.select(this).style('opacity', 0.5);
      })
      .on('mouseout', function(d) {
        tooltip.transition()
          .style('opacity', 0)
        d3.select(this).style('opacity', 1);
      });

    // Add Vertical Axis label
    var vText = svg.selectAll('text')
                   .data(sent)
                   .enter()
                   .append('text')
                   .text(function(d, i) {
                     return dates[i];
                   })
                   .attr('x', 5)
                   .attr('y', function(d,i) {
                     return padding + i*(w/sent.length + padding) + 28;
                   })
                   .attr('font-family', 'Montserrat')
                   .attr('font-size', '11px')
                   .attr('fill', 'white')

    // var title = svg.append('text')
    //                .attr('x',0)
    //                .attr('y',10)
    //                .attr('text-anchor', 'middle')
    //                .style('font-size', '20px')
    //                .style('color', 'white')
    //                .text('Message Sending Frequency by Day')
}

function createReceivedDates(received) {
  var svg = d3.select('.bar1');
  svg.selectAll('rect').remove();

  if (received == undefined) {
    received = [60305, 64906, 60998, 64443, 64732, 57199, 51669];
  }
  var w = 300; var h = 386; var padding = 10;

  var yscale = d3.scaleLinear()
      .domain([Math.min.apply(Math, received) * 0.8, Math.max.apply(Math, received)*1.1])
      .range([5, w]);

  var chart = svg.selectAll('rect')
      .data(received)
      .enter()
      .append('rect')
      .attr('x', d => w - yscale(d))
      .attr('y', function(d,i) {
        return padding + i*(w/received.length + padding);
      })
      .attr('width', d => yscale(d))
      .attr('height', 50)
      .attr('fill', '#6D7993')
      .on('mouseover', function(d) {
        tooltip.transition()
          .style('opacity', 1)
        tooltip.html(d)
          .style('left', (d3.event.pageX)+'px')
          .style('top', (d3.event.pageY) + 'px');
        d3.select(this).style('opacity', 0.5);
      })
      .on('mouseout', function(d) {
        tooltip.transition()
          .style('opacity', 0)
        d3.select(this).style('opacity', 1);
      });

      // Add Text labels
      var vText = svg.selectAll('text')
                     .data(received)
                     .enter()
                     .append('text')
                     .text(function(d, i) {
                       return dates[i];
                     })
                     .attr('x', w - 5)
                     .attr('y', function(d,i) {
                       return padding + i*(w/received.length + padding) + 28;
                     })
                     .attr('text-anchor', 'end')
                     .attr('font-family', 'Montserrat')
                     .attr('font-size', '11px')
                     .attr('fill', 'white')
}


function createBar() {
  var w = 500;
  var h = 500;
  var padding = 3;
  var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                  11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

  var svg = d3.select('.chart2')
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .attr('class', 'dates');

  var chart = svg.selectAll('rect')
       .data(dataset)
       .enter()
       .append("rect")
       .attr("x", function(d,i) {
         return padding + i* w/dataset.length;
       })
       .attr("y", function(d) {
         return 0;
       })
       .attr("width", w/dataset.length - padding)
       .attr("height", d => 5*d)
       .attr("fill", "teal");
}
