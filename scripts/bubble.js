
//
function createBubbles(tag,interface,data) {
  // Reset chart
  d3.select(tag).select('g').remove();

  // Default Data
  if (data == undefined) {
    data =  [["Nala",46919],["Pumbaa",45309],["Timon",43348],["Rafiki",36084],["Mufasa",22030],["Scar",18850],["Sarabi",17179],["Zazu",10253],["Sarafina",9649], ["Li0n",8009],["L10n",7164],["L10n",4843],["L10ness",4099],["Lioness",4055],["Iioness",3486],["L1oness123",3212], ["Shenzi",2811],["Banzai",2784],["Ed",2280],["K1ng",2229],["Royal Lions Near You",1606],["Pride Rock",1384],["Mane Maintainence",1248], ["Munga",1113],["Cute Cats",1111],["PrideBook",1056],["Crocodile",971],["Gorillas",916],["Hyenas",767],["Ostrich",611], ["Casowary",564],["Zebras",546],["Vegan Master41",521],["Lions Near You",403],["Vegetarian Pride3",323],["Paleo King792",313],["Uru",293],["Kopa",280],["Starehe",220],["Giraffes",204],["Kangaroos",194],["Wild Hogs",191],["Birds",174],["Cubs",157], ["Reirei",102],["Aaardwolves",94],["Makini",89],["Ono",87],["Kion",75],["Max",69],["Impala",69], ["Jasiri",12],["Mzingo",10],["Paws",10],["Wildlife life",9],["Madagascar",8],["Prides Near You",7],["ChatBox",6],["Anonymous",5], ["Anonymous",5],["Instant Chess",5],["PlayGo",5],["Words with Friends",4],["PokerPlay",4],["Chat Roulette",3],["UberEats",2],["Congo Lions",2], ["African Lions",2],["Messenger",2],["Predators",2],["Real_Mufasa",1],["RealNala",1],["RealTimon",1],["theRealScar",1],["RealSimba",1],["TheRealSimba",1], ["S1mba",1],["RealLions",1],["RealSarafine",1],["RealMufasa",1],["Big Fish",1],["Fb Chess",1],["Shiki",1],["Babboon",1], ["Elyphant",1],["Gopher",1],["Elephant123",1],["Elephant",1],["E1ephant",1],["Elephunt",1],["Elephont",1]];
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
