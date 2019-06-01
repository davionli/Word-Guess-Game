//TODO: choose topic
//TODO: add some hints

//
$(document).ready(function() {
var letter = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
var personPool = [
    {name: "JackChen", occupation: "movie star", gender: "man", race: "asian"},
    {name: "", occupation: "", gender: "", race: ""},
    {name: "", occupation: "", gender: "", race: ""},
    {name: "", occupation: "", gender: "", race: ""},
    {name: "", occupation: "", gender: "", race: ""},
    {name: "", occupation: "", gender: "", race: ""},
    {name: "", occupation: "", gender: "", race: ""},
    {name: "", occupation: "", gender: "", race: ""},
    {name: "", occupation: "", gender: "", race: ""},
    {name: "", occupation: "", gender: "", race: ""}
]
var animalPool = [
    {name: "", size: "", food: "", color: ""},
    {name: "", size: "", food: "", color: ""},
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
    pool: ["dog", "cat", "fish", "elephant", "panda"],
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
    reset: function() {
        this.secretWord = this.generateWord();
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
    game.reset();
    game.score = 0;
    game.startkey = true;
    $(".displayBar").html(game.wordDisplay);
    $(".usedWord").html("used keys: "+game.usedKey);
    $(".remainded").html("remaining lives: "+game.currentLives);
    $(".score").html("score: "+game.score);
})

document.onkeyup = function(e) {
    if (game.lastWordNumber === 0 ) {
        game.reset();
    }
    if (game.currentLives === 0) {
        game.reset();
    }
    var currentKey = e.key
    if (!game.usedKey.includes(currentKey)&&letter.includes(currentKey.toLocaleLowerCase()) && game.startkey) {
        game.usedKey.push(currentKey.toLocaleLowerCase());
        if (game.currentWord.indexOf(currentKey) === -1)
            game.currentLives--;
        while (game.currentWord.indexOf(currentKey.toLocaleLowerCase()) != -1) {
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