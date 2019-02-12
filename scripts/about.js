
function updateAbout() {
  document.getElementById('ownername').innerText = ' '+ owner;
  document.getElementById('avgWords').innerText =ownerInfo.numWords.toFixed(2);
  document.getElementById('avgChar').innerText = ownerInfo.numChar.toFixed(2);
}
