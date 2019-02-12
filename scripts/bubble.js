

function createBubbles(tag,interface,data) {

  d3.select(tag).select('g').remove();

  if (data == undefined) {
    data = [["Mum", 49806], ["Dad", 48996], ["Grandparents", 14480], ["Uncle Bob", 8010], ["Aunt Cecile", 6438], ["DaughterA", 13150], ["DaughterB", 3892], ["Son2", 21732], ["Son3", 44], ["Big Fish", 92132],
            ["AcquaintanceA", 1]];
  }

  var radScale = d3.scaleSqrt()
      .domain([1, data[0][1]*1.1] )
      .range([5, 80]);
      var h = 700; var w = 700;

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

function sentBubbles(tag,interface,data) {

  d3.select(tag).select('g').remove();

  if (data == undefined) {
    data = [["Mum", 44], ["Dad", 72], ["Grandparents", 14480], ["Uncle Bob", 8010], ["Aunt Cecile", 6438], ["DaughterA", 13150], ["DaughterB", 3892], ["Son2", 21732], ["Son3", 44], ["Big Fish", 92132],
            ["AcquaintanceA", 1]];
    // data = [["Gemma Tyler",46919],["Patrick Ryan",45309],["Joshua Wong",43348],["Sam Janssen",36084],["Priscilla Chen",22030],["Simone Rabey",18850],["Will Markley",17179],["Morgan Collyer-Jones",10253],["Martin Wrzos",9649],["Christine Lan",8009],["Hamish Lennon",7164],["Andrew Makin",4843],["Anjanie Hewakaluge",4099],["undefined",4055],["Andrew Lee",3486],["Kathryn Bate",3212],["Kenneth Guo",2811],["Hugh Wallace",2784],["Amy Zhang",2280],["Victoria Chen",2229],["Andrew James",1606],["Zac Sanchez",1384],["Aman Khalid",1248],["Luke Gelagin",1113],["Michelle Lin",1111],["Yolanda  Wang",1056],["Patrick Hao",971],["Jeremy Kendy",916],["Amy Warner",767],["Alex Mirrington",611],["Justin Painter",564],["Dom Latouche",546],["Jo Zhao",521],["Konstantinos Liandrakis",403],["Jazlyn Jiaming Lin",323],["Amit Deep",313],["David Kim",293],["Tony Wang",280],["Keefe Ip",220],["Callum Logie",204],["James MacNaughton",194],["Brendan McRae",191],["Bill Chan",174],["Brendan Winters",157],["Keegan Gyoery",148],["Homaira Syeda",123],["James Elhindi",120],["Gavin Lee",119],["Victor Wu",115],["Taylor Ruber",114],["Joanna Huang",110],["Mallika Sankar",102],["Ivy Ning",94],["Naomi Murn",89],["Stephanie Angkhawut",87],["Jen How",75],["Brendon Lam",69],["Rachel Huang",69],["Alex Dong",56],["Peter Zavvos",52],["Mark Lan",43],["John Murray",42],["Kuo Simon",42],["Josh Moran",39],["Will Nord",36],["Andrew Dinnel",36],["Chianna Dane",35],["Jess Tavener",35],["Marcus Lee",31],["Remy Swales",31],["Harindu Obeyesekera",29],["Verdy Guo",29],["Ben Vozzo",28],["Saxon Ward",25],["Julian Chen",20],["Jack Clarke",19],["Jian Min Lin",16],["Andy Tran",14],["Nore Louise",13],["Jack English",12],["Linus Wong",12],["Judy Chiu",12],["Phil Playoust",10],["Dion Marks",10],["John Davie",9],["Ollie Moore",8],["Jeremy Nissen",7],["Kelvin Li",6],["Lachlan Stephen",5],["Monty Guo",5],["Instant Chess",5],["Tom Whittingham",5],["Seamus Field",4],["Jacob Wroughton",4],["Chris McJohn",3],["James McFadden",2],["Beryl Novice",2],["Ella Coleman",2],["Messenger",2],["Alex Robinson",2],["Aleks Kaz",2],["Peter Munns",2],["Nic Kyriazis",2],["Himath Siriniwasa",2],["Stewart Ross",2],["Ben Hogan",2],["Salil Shringarpure",1],["Julia Wong",1],["Vanya Nyam",1],["Asad John Ishak",1],["William McDermott",1],["Nick Cranch",1],["Jonathan Curulli",1],["Jen Ho",1],["Eric Deng",1],["Victor Sun",1],["Patrick Ellem",1],["Oliver Wang",1],["Claire Shi",1],["Steven Xie",1],["Patrick Hides-Pearson",1],["Harry Zhanga",1],["Maggie Shao",1],["Topi Burt",1],["Anne Hu",1],["Vaishnavi Veeraraghavan",1],["Kai Williamson",1]];
  }

  var radScale = d3.scaleSqrt()
      .domain([1, data[0][1]*1.1] )
      .range([5, 80]);
      var h = 700; var w = 700;

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
