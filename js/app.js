// Filtering the lorem ipsum placer text to only 5 letter words 
let validWords = ['lorem', 'ipsum', 'mordo', 'frodo', 'baggi']

// Choosing a missingLorem
let missingLorem = 'lorem'

// Represents a current tile
let currentTile = 0

// Represents how many letters you have typed in your guess. This variable will back to 0 once entered
let currentLetterIn = 0

// Guesses Made 
let guessesMade = 0

// List of all the tiles on the board
let tilesList = document.getElementsByClassName('tile')

// Allowing user to type a letter via a physical keyboard
document.addEventListener('keydown', addLetter)
function addLetter(e) {
    let keyPress = String(e.key)
    if (keyPress === 'Backspace'){
        if (currentTile <= 0){
            return
        } else {
            removeLetter()
        }
    }
    else if (keyPress === "Enter") {
        if (currentLetterIn === 5) {
            let word = getWord()
            console.log(word)
        }
        else {
            return
        }
    }
    else if (currentLetterIn < 5) {
        if (inAlphabetHuh(keyPress)) {
            insertLetter(keyPress)
        }
        else {
            return
        }
    }
    else {
        return
    }
}

// Gets the five letter word
function getWord(){
    let guess = ''
    for (let i = currentTile - currentLetterIn; i < currentTile; i++){
        guess += `${tilesList[i].children[0].innerText}`
    }
    return guess
}

// Removes the appropriate letter from the tile
function removeLetter() {
    currentTile -= 1
    currentLetterIn -= 1 // Updating the number of letters in a single guess
    tilesList[currentTile].children[0].remove()
}

// Inserts a letter into the appropriate tile
function insertLetter(letter){
    let letterContainer = document.createElement('div') // Creating a letter container
    letterContainer.classList.add('letter') // Styling the letter
    letterContainer.innerText = letter // Inserting the letter 
    tilesList[currentTile].appendChild(letterContainer) // Appending the container to the tile
    currentTile += 1 // Updating current tile
    currentLetterIn += 1 // Updating the number of letters in a single guess
}


// Helper Functions
// Checks if the given letter is in the alphabet
function inAlphabetHuh(letter){
    let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] // Allowed characters
    for (let i = 0; i < alphabet.length; i++){
        if (letter === alphabet[i]) {
            return true
        }
    }
    return false
}