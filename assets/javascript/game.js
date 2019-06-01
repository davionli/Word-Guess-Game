//TODO: choose topic
//TODO: add some hints

//
$(document).ready(function() {
var pool = ["dog", "cat", "fish", "elephant", "panda"];
var secretWord;
var currentWord;
var usedKey;
var wordDisplay;
var lastWordNumber = 0;

console.log(`the word is ${secretWord}`);

function generateWord() {
    return pool[Math.floor(Math.random() * pool.length)];
}

// Function to replace character in the string passed with another character
function replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement+ str.substr(index + replacement.length);
}

function coverWithUderline(word) {
// Using regular expressions to change word to blank 
// /\w/ means any alphabeta letter, g means globle
    return word.replace(/\w/g, "_ ");
}

function reset() {
    secretWord = generateWord();
    currentWord = secretWord;
    usedKey = [];
    wordDisplay = coverWithUderline(secretWord);
    lastWordNumber = currentWord.length;
}

document.onkeyup = function(e) {
    if (lastWordNumber === 0 ) {
        reset();
    }
    
    var currentKey = e.key
    if (!usedKey.includes(currentKey)) {
        usedKey.push(currentKey);
        while (currentWord.indexOf(currentKey) != -1) {
            wordDisplay = replaceAt(wordDisplay, currentWord.indexOf(currentKey)*2, currentKey);
            currentWord = replaceAt(currentWord, currentWord.indexOf(currentKey), "#");
            lastWordNumber--;
        }
    }
    $("#wordBar").html(wordDisplay);
    console.log(usedKey);
    // console.log("current word: " + currentWord);
    console.log(wordDisplay);
    
   
    
} 
});