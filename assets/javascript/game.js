//TODO: choose topic
//TODO: add some hints

//
$(document).ready(function() {
var letter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var personPool = [
    {name: "JACKCHEN", occupation: "movie star", gender: "man", nationality: "China"},
    {name: "TAYLORSWIFT", occupation: "singer", gender: "woman", nationality: "USA"},
    {name: "GEORGEWASHINGTON", occupation: "president", gender: "man", nationality: "USA"},
    {name: "ELIZABETHII", occupation: "monarch", gender: "woman", nationality: "UK"},
    {name: "NAPOLEON", occupation: "monarch", gender: "man", nationality: "France"},
    {name: "OPRAHWINFREY", occupation: "talk show host", gender: "woman", nationality: "USA"},
    {name: "MAOZEDONG", occupation: "revolutionary", nationality: "man", nationality: "asian"},
    {name: "JOSEPHSTALIN", occupation: "president", gender: "man", nationality: "USSR"},
    {name: "MICHAELJACKSON", occupation: "singer", gender: "man", nationality: "USA"},
    {name: "ANGELAMERKEL", occupation: "president", gender: "woman", nationality: "Germany"}
]
var animalPool = [
    {name: "", size: "", food: "", color: ""},
    {name: "FLAMINGO", size: "", food: "", color: ""},
    {name: "", size: "", food: "", color: ""},
    {name: "", size: "", food: "", color: ""},
    {name: "", size: "", food: "", color: ""},
    {name: "", size: "", food: "", color: ""},
    {name: "", size: "", food: "", color: ""},
    {name: "", size: "", food: "", color: ""},
    {name: "", size: "", food: "", color: ""},
    {name: "", size: "", food: "", color: ""},
]
var game = {
    pool: ["DOG", "CAT", "FISH", "ELEPHANT", "PANDA"],
    secretWord: "",
    currentWord: "",
    usedKey: [],
    wordDisplay: " ",
    lastWordNumber: 0,
    currentLives: 0,
    score: 0,
    startkey: false,
    generateWord: function() {
        return this.pool[Math.floor(Math.random() * this.pool.length)];
    },
    coverWithUderline: function (word) {
        // Using regular expressions to change word to blank 
        // /\w/ means any alphabeta letter, g means globle
        return word.replace(/\w/g, "_ ");
    },
    resetGame: function() {
        this.secretWord = this.generateWord().toUpperCase();
        this.currentWord = this.secretWord;
        this.usedKey = [];
        this.wordDisplay = this.coverWithUderline(this.secretWord);
        this.lastWordNumber = this.currentWord.length;
        this.currentLives = 12;
        this.startkey = false;
    }
}

// Function to replace character in the string passed with another character
function replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement+ str.substr(index + replacement.length);
}
$("#start").on("click", function() {
    game.resetGame();
    game.score = 0;
    game.startkey = true;
    $(".displayBar").html(game.wordDisplay);
    $(".usedWord").html("used keys: "+game.usedKey);
    $(".remainded").html("remaining lives: "+game.currentLives);
    $(".score").html("score: "+game.score);
})

document.onkeyup = function(e) {
    if (game.lastWordNumber === 0 ) {
        game.resetGame();
    }
    if (game.currentLives === 0) {
        game.resetGame();
    }
    var currentKey = e.key.toUpperCase();
    if (!game.usedKey.includes(currentKey)&&letter.includes(currentKey) && game.startkey) {
        game.usedKey.push(currentKey);
        if (game.currentWord.indexOf(currentKey) === -1)
            game.currentLives--;
        while (game.currentWord.indexOf(currentKey) != -1) {
            game.wordDisplay = replaceAt(game.wordDisplay, game.currentWord.indexOf(currentKey)*2, currentKey);
            game.currentWord = replaceAt(game.currentWord, game.currentWord.indexOf(currentKey), "#");
            game.lastWordNumber--;
        }
    }
    if (game.lastWordNumber === 0) {
        game.score++;
    }
    game.startkey = true;
    console.log(game.startkey);
    $(".displayBar").html(game.wordDisplay);
    $(".usedWord").html("used keys: "+game.usedKey);
    $(".remainded").html("remaining lives: "+game.currentLives);
    $(".score").html("score: "+game.score);
} 
});