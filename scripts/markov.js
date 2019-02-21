// Functions to generate sentence via Markov Chain

// Sentence Generator
function getStart(wordList) {
  // Choose a random word from list
  return wordList[Math.floor(Math.random()* wordList.length)];
}

function getNext(current, wordList) {
  // Find next word given current word
  let nextWords = [];
  let word = current.toLowerCase();
  for (let i = 0; i < wordList.length; i++) {
    if (word == wordList[i].toLowerCase()) {
      nextWords.push(wordList[i + 1]);
    }
  }
  return nextWords[Math.floor(Math.random() * nextWords.length)];
}

function getSentence(startList, wordList) {
  let sentence = getStart(startList);
  let currentWord = sentence;
  while (currentWord.indexOf('.') < 0) {
    // Keep finding words until a period is reached.
    currentWord = getNext(currentWord, wordList);
    sentence += ' ' + currentWord;
  }
  return sentence;
}

function getUserSentence(user) {
  return getSentence(userStarts[user], userMessages[user]);
}

function sentenceMinLength(user, n) {
  let sentence = getUserSentence(user);
  while (sentence.split(' ').length < n) {
    sentence = getUserSentence(user);
  }
  return sentence;
}

// Website Functionality

function runMarkov() {
  var nam = document.getElementById('name-markov').value;
  var out = document.getElementById('markov-output');
  out.innerHTML = '';
  if (userMessages[nam] == undefined) {
    var node = document.createElement('p');
    node.className = 'mSentence';
    node.innerText = "Sender '"+ nam + "' cannot be found in your history. Please check and try again."
    out.appendChild(node);
  }
  else {
    let n = 5;
    for (let i = 0; i < n; i++) {
      var node = document.createElement('p');
      node.className = 'mSentence';
      node.innerText = getUserSentence(nam);
      out.appendChild(node);
    }
  }
  return true;
}
