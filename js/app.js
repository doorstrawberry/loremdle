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



document.addEventListener('keydown', handleKeyPress)

function handleKeyPress(e){
    let keyPressed = String(e.key)
    if (keyPressed === "Enter"){
        console.log(keyPressed)
    }
    else if (keyPressed === "Backspace"){
        console.log(keyPressed)
    }
    else if (inAlphabetHuh(keyPressed)) {
        console.log(true)
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

// --------------------------------------------------------------

// // Filtering the lorem ipsum placer text to only 5 letter words 
// let validWords = ['lorem', 'ipsum', 'mordo', 'frodo', 'baggi']

// // Choosing a missingLorem
// let missingLorem = 'lorem'

// // Represents a current tile
// let currentTile = 0

// // Represents how many letters you have typed in your guess. This variable will back to 0 once entered
// let currentLetterIn = 0

// // Guesses Made 
// let whichGuess = 1

// // List of all the tiles on the board
// let tilesList = document.getElementsByClassName('tile')

// // Allowing user to type a letter via a physical keyboard
// document.addEventListener('keydown', addLetter)
// function addLetter(e) {
//     let keyPress = String(e.key)
//     if (keyPress === 'Backspace'){
//         if (currentTile <= 0){
//             return
//         } else {
//             removeLetter()
//         }
//     }
//     else if (keyPress === "Enter") {
//         if (currentLetterIn === 5) {
//             let word = getWord()
//             if (validWordHuh(word)) {
//                 if (word === missingLorem) {
//                     document.removeEventListener('keydown', addLetter)
//                     winStyle()
//                 }
//                 else {
//                     // compareWords(word, missingLorem)
//                     whichGuess += 1
//                     currentLetterIn = 0
//                 }
//             }
//             else {
//                 pass // Write code 
//             }
//         }
//         else {
//             return
//         }
//     }
//     else if (currentLetterIn < 5) {
//         if (inAlphabetHuh(keyPress)) {
//             insertLetter(keyPress)
//         }
//         else {
//             return
//         }
//     }
//     else {
//         return
//     }
// }

// // Compares how similar the given word is to the missing lorem
// function compareWords(word, missingLorem){
//     for (let i = 0; i < word.length; i++){
//         for (let j = 0; j < missingLorem.length; j++){
//             if (word[i] === missingLorem[j]){
//                 if (i === j){
//                     tilesList[i*whichGuess].style.background = "green"
//                 }
//                 else {
//                     tilesList[i*whichGuess].style.background = "yellow"
//                 }
//             }
//         }
//     }
// }

// // Input winning animation
// function winStyle(){
//     for (let i = currentTile - currentLetterIn; i < currentTile; i++){
//         tilesList[i].style.background = "green"
//     }
// }

// // Checks if a word is valid, returns true if it is
// function validWordHuh(word){
//     for (let i = 0; i < validWords.length; i++){
//         if (word === validWords[i]){
//             return true
//         }
//     }
//     return false
// }

// // Gets the five letter word
// function getWord(){
//     let guess = ''
//     for (let i = currentTile - currentLetterIn; i < currentTile; i++){
//         guess += `${tilesList[i].children[0].innerText}`
//     }
//     return guess
// }

// // Removes the appropriate letter from the tile
// function removeLetter() {
//     currentTile -= 1
//     currentLetterIn -= 1 // Updating the number of letters in a single guess
//     tilesList[currentTile].children[0].remove()
// }

// // Inserts a letter into the appropriate tile
// function insertLetter(letter){
//     let letterContainer = document.createElement('div') // Creating a letter container
//     letterContainer.classList.add('letter') // Styling the letter
//     letterContainer.innerText = letter // Inserting the letter 
//     tilesList[currentTile].appendChild(letterContainer) // Appending the container to the tile
//     currentTile += 1 // Updating current tile
//     currentLetterIn += 1 // Updating the number of letters in a single guess
// }
