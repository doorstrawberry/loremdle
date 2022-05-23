// Choosing a missingLorem
let missingLorem = 'Lorem'

// Storing player's guesses 
let guessedWords = [[], [], [], [], []]

// Represents a current tile
let currentTile = 0

// Allowing user to type a letter via a physical keyboard
document.addEventListener('keydown', addLetter)
function addLetter(e) {
    let keyPress = String(e.key)
    if (keyPress === 'Backspace'){
        removeLetter()
    }
    else if (keyPress === "Enter") {
        checkGuess()
    }
    else if (inAlphabetHuh(keyPress)) {
        insertLetter()
    }
    else {
        return
    }
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