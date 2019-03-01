// Parser Variables
// Dataframe, owner's name
var df = [];
var owner = {};
var started = 0;
var finished = 0;


// Predefined Variables

// Received Bubble Chart
var rankChats = {};           // Chats ranked by receiver
var rankReceived;

// Sent Bubble Chart
var sentData = {};            // Frequency of msg sent by owner to each chat
var sentBubble;

// Message Type Bar Chart
var ownerData;                // Containers frequency of msg, stickers, etc

// Bar chart of messages sent per day
var dates = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var sent = [0, 0, 0, 0, 0, 0 ,0];
var received = [0, 0, 0, 0, 0, 0 ,0];

// Variables for Table Data
var sentRankingsDict;
var ownerInfo;

// Variables for Markov Section (used in Parser)
var userStarts = {};
var userMessages = {};

// Extra Variables (For Now)
var earliest;                 // Date of earliest message
var latest;                   // Date of latest message
var numMessagesByDate = {};
var numMessagesCount = 0;

// Dates Messaged 
var datesMessaged = {};
var datesMessagedHourly = {};
var datesMessagedDaily = {};

// Event Listenrs
// var button = document.getElementById('submit-button');
// button.addEventListener('click', function() {
//   runMarkov();
//   return false;
// });

function main() {
  getOwner();
  rankManipulate(df);

  // Create Frequency by Day Bar Charts
  getDates(df);
  createSentDates(sent);
  createReceivedDates(received);

  // Create received messages bubble
  rankReceived = rankBy(rankChats, 'message');
  createBubbles('.bubbles', '.interface',rankReceived);

  // Create Sent messages bubble
  sentBubble = rankSent(sentData);
  createBubbles('.bubbles2','.interface2', sentBubble);
  sentRankingsDict = getSentRanks(sentBubble);

  // Create MEssage Type bar chart
  messageTypes(ownerData);

  // Owner Information
  ownerInfo = convertOwnerData(ownerData);
  updateAbout();
  makeTable();

  // Markov Chain owner
  document.getElementById('name-markov').value = owner;
  runMarkov();
}

function startup() {
  // Dates Bar Chart
  createSentDates();
  createReceivedDates();

  // Bubble Chart
  createBubbles('.bubbles', '.interface');
  createBubbles('.bubbles2', '.interface2')

  // Message sentDataypes
  messageTypes();
}

// Data frame manipulations and ranking functions

function rankManipulate(df) {
  // Create datafrane to be used for ranking data
  df.filter(function(msg) {

    // Conditions if Owner messaged
    if (msg.sender == owner) {

      var chat = msg.title;
      if (sentData[chat] == undefined) {
        sentData[chat] = 0;
      }
      sentData[chat] += 1;
    }

    // Information involving Dates
    var tmpDate = msg.date;
    var dateKey = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDay());
    var dateHourly = dateKey;
    dateHourly.setMinutes(0);
    dateHourly.setSeconds(0);
    var dateDaily = dateHourly;
    dateDaily.setHours(0);

    if (datesMessaged[msg.sender] == undefined) {
      datesMessaged[msg.sender] = {};
      datesMessagedHourly[msg.sender] = {};
      datesMessagedDaily[msg.sender] = {};
    }

    if (datesMessaged[msg.sender][dateKey] == undefined) {
      datesMessaged[msg.sender][dateKey] = 0;
    }

    if (datesMessagedHourly[msg.sender][dateHourly] == undefined) {
      datesMessagedHourly[msg.sender][dateHourly] = 0;
    }

    if (datesMessagedDaily[msg.sender][dateDaily] == undefined) {
      datesMessagedDaily[msg.sender][dateDaily] = 0;
    }

    datesMessaged[msg.sender][dateKey] += 1;
    datesMessagedHourly[msg.sender][dateHourly] += 1;
    datesMessagedDaily[msg.sender][dateDaily] += 1;

    if (earliest == undefined) {
      earliest = dateKey;
      latest = dateKey;
    }

    if (earliest > dateKey) {
      earliest = dateKey;
    }
    if (latest < dateKey) {
      latest = dateKey;
    }

    if (numMessagesByDate[dateKey] == undefined) {
      numMessagesByDate[dateKey] = 0;
      numMessagesCount += 1;
    }
    numMessagesByDate[dateKey] += 1;

    // Information for normal messages
    if (msg.threadType == 'Regular') {
      var name = msg.sender;
      if (rankChats[name] == undefined) {
        rankChats[name] = {
          'words' : 0,
          'characters' : 0,
          'message' : 0,
          'sticker' : 0,
          'gif' : 0,
          'photos' : 0,
          'totalSent' : 0
        };
      }


      rankChats[name]['totalSent'] += 1;
      rankChats[name][msg.media] += 1;

      if (msg.media == 'message') {
        rankChats[name]['characters'] += msg.length;
        rankChats[name]['words'] += msg.numWords;
      }

    }


  });
}

// Media: photos, message, etc
function rankBy(df, media) {
  // Rank received data
  ownerData = df[owner];
  delete df[owner];
  var ranked = Object.keys(df).map(function(key) {
    return [key, df[key][media] ];
  });
  ranked.sort(function(a,b) {
    return b[1] - a[1];
  });
  return ranked;
}

function rankSent(df) {
  // Rank sentData
  var sent = Object.keys(df).map(function(key) {
    return [key, df[key]];
  })
  sent.sort((function(a,b) {
    return b[1] - a[1];
  }))
  return sent;
}

function getSentRanks(df) {
  var dict = {};
  for (let i = 0; i < df.length; i++) {
    dict[df[i][0]] = i + 1;
  }
  return dict;
}

function convertOwnerData(data) {
  // Converts Owner Data to be used by about you
  var tmp = {
    'numWords' : data.words / data.message,
    'numChar' : data.characters / data.words,
    'perDate' : avgMsgPerDay(data)
  }
  return tmp;
}

function avgMsgPerDay(data) {
  var tot = 0;
  for (let key of Object.keys(data)) {
    tot += data[key];
  }
  return tot/numMessagesCount;
}
