// Choosing a missingLorem
let missingLorem = 'Lorem'

// Storing player's guesses 
let guessedWords = [[], [], [], [], []]

// Current tile
let currentTile = 0

// Allowing user to type a letter
document.addEventListener("keydown", addLetter)
function addLetter(e) {
    let tilesList = document.getElementsByClassName('tile')
    let character = String(e.key)

    let letterContainer = document.createElement('div') // Where the letter is going to sit
    letterContainer.classList.add('letter') // Adding letter styles to the container
    letterContainer.innerText = character // Adding the guessed letter to the container
    tilesList[currentTile].appendChild(letterContainer) // Determining which tile the container should append to
    currentTile += 1 // Updating the current tile
}



