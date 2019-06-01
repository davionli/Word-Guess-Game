//TODO: choose topic
//TODO: add some hints

//
$(document).ready(function() {
var letter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var personPool = [
    {name: "JACKIECHEN", occupation: "movie star", gender: "man", nationality: "China", pic: "assets/images/jackiechen.jpg"},
    {name: "TAYLORSWIFT", occupation: "singer", gender: "woman", nationality: "USA", pic: "assets/images/taylorswift.jpg"},
    {name: "GEORGEWASHINGTON", occupation: "president", gender: "man", nationality: "USA", pic: "assets/images/georgewashington.jpg"},
    {name: "ELIZABETHII", occupation: "monarch", gender: "woman", nationality: "UK", pic: "assets/images/elizabethii.jpg"},
    {name: "NAPOLEON", occupation: "monarch", gender: "man", nationality: "France", pic: "assets/images/napoleon.jpg"},
    {name: "OPRAHWINFREY", occupation: "talk show host", gender: "woman", nationality: "USA", pic: "assets/images/oprah.jpg"},
    {name: "MAOZEDONG", occupation: "revolutionary", nationality: "man", nationality: "China", pic: "assets/images/maozedong.jpg"},
    {name: "MICHAELJORDAN", occupation: "player", gender: "man", nationality: "USA", pic: "assets/images/jordan.jpg"},
    {name: "MICHAELJACKSON", occupation: "singer", gender: "man", nationality: "USA", pic: "assets/images/mj.jpg"},
    {name: "DAENERYSTARGARYEN", occupation: "queen", gender: "woman", nationality: "Seven Kingdoms", pic: "assets/images/deny.jpg"}
]
var animalPool = [
    {name: "", feet: "", food: "", live: ""},
    {name: "FLAMINGO", feet: "2", food: "", live: ""},
    {name: "", feet: "", food: "", live: ""},
    {name: "", feet: "", food: "", live: ""},
    {name: "", feet: "", food: "", live: ""},
    {name: "", feet: "", food: "", live: ""},
    {name: "", feet: "", food: "", live: ""},
    {name: "", feet: "", food: "", live: ""},
    {name: "", feet: "", food: "", live: ""},
    {name: "", feet: "", food: "", live: ""},
]
var game = {
    pool: [{name: "DOG", feet: "4", live: "land/indoor/wild", pic: ""}, {name: "CAT", feet: "4", live: "land/indoor/wild", pic: ""}, {name: "ELEPHANT", feet: "4", live: "land/wild", pic: ""}, {name: "PANDA", feet: "4", live: "land/wild", pic: ""}],
    secretWord: "",
    currentWord: "",
    usedKey: [],
    wordDisplay: " ",
    lastWordNumber: 0,
    currentLives: 0,
    score: 0,
    imgLink: "",
    startkey: false,
    generateWord: function() {
        var index = Math.floor(Math.random() * this.pool.length);
        this.imgLink = this.pool[index].pic;
        return this.pool[index].name;
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
        this.currentLives = 8;
        
        this.startkey = false;
    },
    showAnswer: function() {
        $("#answer").text("ANSWER: " + this.secretWord);
        console.log(this.imgLink);
        $("#ansPic").attr("src", this.imgLink);
    }
}

// Function to replace character in the string passed with another character
function replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement+ str.substr(index + replacement.length);
}
$("#topic1").on("click", function() {
    game.pool = personPool;
    $("#topic").html("TOPIC: PERSON");
})

$("#start").on("click", function() {
    game.resetGame();
    game.score = 0;
    game.startkey = true;
    $(".displayBar").html(game.wordDisplay);
    $(".usedWord").html("USED KEYS: "+game.usedKey);
    $(".remainded").html("REMAINING LIVES: "+game.currentLives);
    $(".score").html("SCORE: "+game.score);
})

document.onkeyup = function(e) {
    if (game.lastWordNumber === 0 ) {
        game.resetGame();
    }
    if (game.currentLives === 0) {
        game.resetGame();
        game.showAnswer();
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
        game.showAnswer();
        game.score++;
    }
    game.startkey = true;
    $(".displayBar").html(game.wordDisplay);
    $(".usedWord").html("USED KEYS: "+game.usedKey);
    $(".remainded").html("REMAINING LIVES: "+game.currentLives);
    $(".score").html("SCORE: "+game.score);
} 
});