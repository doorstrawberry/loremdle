// -----------------------------
// Making sure everything is set
// -----------------------------
// List of valid words
let validWords = ['lorem', 'ipsum', 'frodo', 'baggi', 'mordo', 'looem', 'ponyo']

// Setting the missing lorem
let missingLorem = 'lorem'

// -----------------------------
// Creating the gameboard!
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Creating the squares on the board
    createGameboard()
    function createGameboard() {
        const gameboard = document.getElementById('gameboard')
        for (let i = 0; i < 30; i++) {
            let square = document.createElement('div')
            square.id = i + 1
            square.classList.add('tile')
            gameboard.appendChild(square)
        }
    }
})

// -----------------------------
// Declaring Global Variables
// -----------------------------

// List of all the tiles on the board
let tilesList = document.getElementsByClassName('tile')

// Represnts how many letters left for our guess
let lettersLeft = 5

// Represents which guess we are on
let guessOn = 1

// Represents the current tile we are on
let currentTile = 0

// List of our guesses made
let guessesList = []

// Represent our current guess
let guess = ''

// -----------------------------
// Handles every keys pressed
// -----------------------------
document.addEventListener('keydown', handleKeyPress)

function handleKeyPress(e) {
    let keyPressed = String(e.key)
    if (keyPressed === "Enter") {
        if (lettersLeft === 0) {
            if (validWordHuh(guess)) {
                if (checkWin(guess, missingLorem)) {
                    for (let i = 0; i < 5; i++) {
                        tilesList[(currentTile - 5) + i].style.background = "green"
                    }
                    document.removeEventListener('keydown', handleKeyPress)
                }
                else {
                    for (let i = 0; i < 5; i++) {
                        tilesList[(currentTile - 5) + i].style.background = "gray"
                    }
                    compareWords(guess, missingLorem)
                    guessesList.push(guess)
                    guess = ''
                    guessOn += 1
                    lettersLeft = 5
                }
            }
            else {
                notValid()
                setTimeout(removeNotValid, 1500)
            }
        }
        else {
            return
        }
    }
    else if (keyPressed === "Backspace") {
        if (lettersLeft === 5) {
            return
        }
        removeLetter()
        guess = guess.replace(guess[guess.length - 1], '')
        currentTile -= 1
        lettersLeft += 1
    }
    else if ((inAlphabetHuh(keyPressed))) {
        if (lettersLeft > 0) {
            insertLetter(keyPressed)
            lettersLeft -= 1
            currentTile += 1
            guess += keyPressed
        }
        else {
            return
        }
    }
    else {
        return
    }
}

// Inserts a letter into the appropriate tile
function insertLetter(letter) {
    let letterContainer = document.createElement('div') // Creating a letter container
    letterContainer.classList.add('letter') // Styling the letter
    letterContainer.innerText = letter // Inserting the letter 
    tilesList[currentTile].appendChild(letterContainer) // Appending the container to the tile
}

// Removes the appropriate letter from the tile
function removeLetter() {
    tilesList[currentTile - 1].children[0].remove('div')
}

// Compares how similar the given word is to the missing lorem
// FIX THIS!
function compareWords(word, missingLorem) {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++){
            if (word[i] === missingLorem[j]) {
                if (i === j){
                    tilesList[(currentTile - 5) + i].style.background = "green"
                }
                else {
                    tilesList[(currentTile - 5) + i].style.background = "yellow"
                }
            }
        }
    }
}

// Checks if the guess is the given word!
function checkWin(word, missingLorem) {
    if (word === missingLorem) {
        return true
    }
    else false
}


// -----------------------------
// Helper Functions
// -----------------------------
// Checks if the given letter is in the alphabet
function inAlphabetHuh(letter) {
    let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] // Allowed characters
    for (let i = 0; i < alphabet.length; i++) {
        if (letter === alphabet[i]) {
            return true
        }
    }
    return false
}

// Checks if a word is valid, returns true if it is
function validWordHuh(word) {
    for (let i = 0; i < validWords.length; i++) {
        if (word === validWords[i]) {
            return true
        }
    }
    return false
}

// Displays not a valid word message
function notValid() {
    let notValidMessage = document.createElement('div')
    notValidMessage.classList.add('not-valid')
    notValidMessage.innerText = `Not a valid "lorem ipsum" word`
    document.querySelector('body').appendChild(notValidMessage)
}

// Removes the notValid message
function removeNotValid() {
    let m = document.getElementsByClassName('not-valid')
    m[0].remove('div')
}