var rankChats = {};
var ownerData;
var rankSent;

function main() {
  getOwner();
  rankManipulate(df);

  // Create Frequency by Day Bar Charts
  getDates(df);
  createSentDates(sent);
  createReceivedDates(received);

  // Create Bubbles
  rankReceived = rankBy(rankChats, 'message');
  createBubbles('.bubbles', rankReceived);
}

function startup() {
  // Dates Bar Chart
  createSentDates();
  createReceivedDates();

  // Bubble Chart
  createBubbles('.bubbles');


  // Message messageTypes
  messageTypes();
}
function rankManipulate(df) {
  // Create datafrane to be used for ranking data
  df.filter(function(msg) {
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
