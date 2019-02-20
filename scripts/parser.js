function getOwner() {
  // Determines the owner's name frmo JSON file.
  owner = Object.keys(owner).reduce(function(a,b) { return owner[b] > owner[a] ? b : a; });
}


function parseData(upload) {
  // Reads data
  for (let file of upload.files) {
    if (file.webkitRelativePath.endsWith("message.json")) {
      readJSON(file);
      started += 1;
    }
  }
}

// Note: Can do total length
// Reads a JSON file and appends to df
function readJSON(file) {
  var reader = new FileReader();
  var media = '';
  reader.onloadend = function() {
      data = JSON.parse(reader.result);

      dataInfo = {
        'threadType' : data.thread_type,
        'title' : data.title
      };

      // Determine the owner by counting participants in data
      // Key with highest value
      if (data.is_still_participant) {
        data.participants.forEach(function(p) {
          if (owner[p.name] == undefined) {
            owner[p.name] = 0;
          }
          owner[p.name] += 1;})
      }

      for (let msg of data.messages) {
        var numWords = NaN;
        var length = NaN;

        // Situation occurs in groups regarding adding/leaving groups
        if (msg.content == undefined || msg.content == 'You left the group.' || msg.content.slice(0,35) == 'Say hi to your new Facebook friend,') {
          continue;
        }

        if (msg.sticker != undefined) {
          media = 'sticker';
        }
        else if (msg.gif != undefined) {
          media = 'gif';
        }
        else if (msg.photos != undefined) {
          media = 'photos';
        }
        else {
          media = 'message';
          // Add to Text Data (for Markov)
          var cont = (msg.content.indexOf('.') > 0) ? msg.content.split(' ') : (msg.content + '.').split(' ');
          numWords = cont.length;
          length = msg.content.length;
          if (userMessages[msg.sender_name] == undefined) {
            userMessages[msg.sender_name] = [];
            userStarts[msg.sender_name] = [];
          }
          userStarts[msg.sender_name].push(cont[0]);
          for (let word of cont) {
            userMessages[msg.sender_name].push(word);
          }
        }
        msgInfo = {
          'sender' : msg.sender_name,
          'content' : msg.content,
          'numWords' : numWords,
          'length' : length,
          'timestamp-ms' : msg.timestamp_ms,
          'date' : new Date(msg.timestamp_ms),
          'media' : media
        };

        df.push(Object.assign(msgInfo, dataInfo));
      }
      finished += 1;
      if (started == finished) {
        main();
      }
  };
  reader.readAsText(file);
}
