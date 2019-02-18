

// Predefined Variables
var rankChats = {};           // Chats ranked by receiver
var ownerData;                // Containers frequency of msg, stickers, etc
var sentData = {};            // Frequency of msg sent by owner to each chat
var numMessagesByDate = {};
var numMessagesCount = 0;
var ownerInfo;
var earliest;                 // Date of earliest message
var latest;                   // Date of latest message
var sentRankingsDict;

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
  rankSent = rankSent(sentData);
  createBubbles('.bubbles2','.interface2', rankSent);
  sentRankingsDict = getSentRanks(rankSent);

  // Create MEssage Type bar chart
  messageTypes(ownerData);

  // Owner Information
  ownerInfo = convertOwnerData(ownerData);
  updateAbout();
  makeTable();
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
    if (msg.sender == owner) {

      var chat = msg.title;
      if (sentData[chat] == undefined) {
        sentData[chat] = 0;
      }
      sentData[chat] += 1;
    }


    var tmpDate = msg.date;
    var dateKey = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDay());

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
