//TODO: choose topic
//TODO: add some hints

//
$(document).ready(function() {
var letter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/audio/cheer.mp3");
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
    {name: "RAVEN", feet: "2", food: "meat", live: "sky/land", pic: "assets/images/raven.jpg"},
    {name: "FLAMINGO", feet: "2", food: "fish", live: "land/wild", pic: "assets/images/FLAMINGO.jpg"},
    {name: "TURKEY", feet: "2", food: "grain", live: "land/wild/", pic: "assets/images/turkey.jpg"},
    {name: "PENGUIN", feet: "2", food: "fish", live: "land/wild/ice field", pic: "assets/images/penguin.jpg"},
    {name: "BEAVER", feet: "4", food: "fish/meat", live: "water/land", pic: "assets/images/beaver.jpg"},
    {name: "RHINOCEROS", feet: "4", food: "meat", live: "land/wild", pic: "assets/images/RHINOCEROS.jpg"},
    {name: "SHRIMP", feet: "many", food: "fish", live: "lake/sea", pic: "assets/images/shrimp.jpg"},
    {name: "DOLPHIN", feet: "0", food: "meat", live: "sea/ocean", pic: "assets/images/dolphin.jpg"},
    {name: "CHIMPANZEE", feet: "4", food: "meat", live: "land/jungle", pic: "assets/images/CHIMPANZEE.jpg"},
    {name: "LOBSTER", feet: "many", food: "fish", live: "sea/ocean", pic: "assets/images/lobster.jpg"},
]
var game = {
    pool: [{name: "PANDA", feet: "4", food: "bamboo", live: "land/indoor/wild", pic: "assets/images/panda.jpg"}],
    secretWord: "",
    currentWord: "",
    usedKey: [],
    wordDisplay: " ",
    lastWordNumber: 0,
    currentLives: 0,
    currentHint:"",
    score: 0,
    imgLink: "",
    startkey: false,
    generateWord: function() {
        var index = Math.floor(Math.random()*this.pool.length);
        var hintIndex = Math.floor(Math.random()*3)+1;
        var hintKey = Object.keys(this.pool[index]);
        var hintValue = Object.values(this.pool[index]);
        this.currentHint = hintKey[hintIndex] + "-" + hintValue[hintIndex];
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
$("#topic2").on("click", function() {
    game.pool = animalPool;
    $("#topic").html("TOPIC: ANIMAL");
})
$("#hint").on("click", function() {
    game.currentLives -= 2;
    $("#hintDisplay").html("HINT: " + game.currentHint);
    $(".remainded").html("REMAINING LIVES: "+game.currentLives);

})


$("#start").on("click", function() {
    game.resetGame();
    game.score = 0;
    game.startkey = true;
    $(".displayBar").html(game.wordDisplay);
    $(".usedWord").html("USED KEYS: "+game.usedKey);
    $(".remainded").html("REMAINING LIVES: "+ game.currentLives);
    $(".score").html("SCORE: "+game.score);
})

document.onkeyup = function(e) {
    // Reset game
    if (game.lastWordNumber === 0 ) {
        game.resetGame();
    }

    // Run out of lives
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
    

    // Guess Right, Congratuation!!
    if (game.lastWordNumber === 0) {
        game.showAnswer();
        audioElement.play();
        game.score++;
    }
    game.startkey = true;
    $(".displayBar").html(game.wordDisplay);
    $(".usedWord").html("USED KEYS: "+game.usedKey);
    $(".remainded").html("REMAINING LIVES: "+game.currentLives);
    $(".score").html("SCORE: "+game.score);
} 
});