// Choosing a missingLorem
let missingLorem = 'Lorem'

// Storing player's guesses 
let guessedWords = [[], [], [], [], []]

// Represents a current tile
let currentTile = 0

// Represents how many letters you have typed in your guess
let currentLetterIn = 1

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
    else if (currentLetterIn <= 5) {
        if (keyPress === "Enter") {
            checkGuess()
        }
        else if (inAlphabetHuh(keyPress)) {
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

// Removes the appropriate letter from the tile
function removeLetter() {
    currentTile -= 1
    tilesList[currentTile].children[0].remove()
    currentLetterIn -= 1 // Updating the number of letters in a single guess
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