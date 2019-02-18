
function updateAbout() {
  // Updates About page
  var numDays = Math.round((latest-earliest)/(1000*60*60*24))

  document.getElementById('ownername').innerText = ' '+ owner;
  document.getElementById('numDays').innerText = numDays;
  document.getElementById('avgWords').innerText =ownerInfo.numWords.toFixed(2);
  document.getElementById('avgChar').innerText = ownerInfo.numChar.toFixed(2);

  document.getElementById('txtSenDay').innerText = ((ownerData.message)/numDays).toFixed(2);
  document.getElementById('phoSenDay').innerText = ((ownerData.photos)/numDays).toFixed(2);
  document.getElementById('stiSenDay').innerText = ((ownerData.sticker)/numDays).toFixed(2);
  document.getElementById('msgRecDay').innerText = ((df.length - ownerData.totalSent)/numDays).toFixed(2);
}


function makeTable() {
  var table = '<table>';
  var columns = ['Name', 'Sent Rank', 'Total Sent',  'Received Rank', 'Total Received', 'Avg Word per Message', 'Avg Number of Characters per Word',
                    'Messages Received', 'Stickers Received', 'Photos Received'];
  table += '<tr>';
  for (let col of columns) {
    table += '<th>' + col + '</th>';
  }
  table += '</tr>';

  for (let rank of Object.keys(rankReceived)) {
    var nam = rankReceived[rank][0];
    table += '<tr>';

    table += '<td>' + nam + '</td>';
    table += '<td>' + sentRankingsDict[nam] + '</td>';
    table += '<td>' + sentData[nam] + '</td>';
    table += '<td>' + (+rank+1) + '</td>';
    table += '<td>' + rankChats[nam].totalSent + '</td>';
    table += '<td>' + (rankChats[nam].words/ rankChats[nam].message).toFixed(2) + '</td>';
    table += '<td>' + (rankChats[nam].characters/ rankChats[nam].words).toFixed(2) + '</td>';
    table += '<td>' + rankChats[nam].message + '</td>';
    table += '<td>' + rankChats[nam].sticker + '</td>';
    table += '<td>' + rankChats[nam].photos + '</td>';
    table += '</tr>';
  }
  table += '</table>'
  document.getElementById('table-container').innerHTML = table;
}
