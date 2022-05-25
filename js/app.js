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
// Preprocessing Text File
// -----------------------------
let validWords = []
let missingLorem = '' 
fetch('lorem.txt')
    .then((response) => response.text())
    .then((data) => {
        let temp = []
        for (let i = 0; i < data.length; i++) {
            if ((data[i] === ',') || (data[i] === '.') || (data[i] === '!') || (data[i] === '?')) {
                data = data.replace(data[i], '')
            }
        }
        temp = data.split(' ')
        for (let j = 0; j < temp.length; j++) {
            if (temp[j].length === 5) {
                validWords.push(temp[j].toLowerCase()) // List of valid words
            }
        }
        missingLorem = validWords[Math.floor(Math.random() * validWords.length)] // Choosing a random word
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
// Handles every keys pressed on webkeyboard
// -----------------------------
let keyboardTiles = document.querySelectorAll('button')
for (let i = 0; i < keyboardTiles.length; i++) {
    keyboardTiles[i].addEventListener('click', (e) => {
        let pressed = e.target.id
        main(pressed)
    })
}
// -----------------------------
// Handles every keys pressed
// -----------------------------
document.addEventListener('keydown', (e) => {
    let pressed = String(e.key)
    main(pressed)
})

function main(keyPressed) {
    if (keyPressed === "Enter") {
        if (lettersLeft === 0) {
            if (validWordHuh(guess)) {
                if (checkWin(guess, missingLorem)) {
                    for (let i = 0; i < 5; i++) {
                        tilesList[(currentTile - 5) + i].style.background = "green"
                    }
                    for (let j = 0; j < tilesList.length; j++) {
                        tilesList[j].style.opacity = "50%"
                    }
                    document.removeEventListener('keydown', main)
                    let keyboardTiles = document.querySelectorAll('button')
                    for (let i = 0; i < keyboardTiles.length; i++) {
                        keyboardTiles[i].removeEventListener('click', (e) => {
                            let pressed = e.target.innerText
                            main(pressed)
                        })
                    }
                    displayWinMessage()
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
                    if (guessOn === 7) {
                        displayLostMessage()
                    }
                }
            }
            else {
                notValid()
                setTimeout(removeNotValid, 1500)
            }
        }
        else {
            notEnough()
            setTimeout(removeNotEnough, 1500)
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
function compareWords(word, missingLorem) {
    let remainingLetters = missingLorem
    let greenList = []
    for (let i = 0; i < 5; i++) {
        if (word[i] === missingLorem[i]) {
            remainingLetters = remainingLetters.replace(word[i], '')
            tilesList[(currentTile - 5) + i].style.background = "green"
            greenList.push(word[i])
        }
    }
    for (let g = 0; g < greenList.length; g++){
        let idName = greenList[g]
        let temp = document.getElementById(idName)
        temp.style.background = "green"
    }

    let yellowList =[]
    for (let j = 0; j < 5; j++) {
        if ((remainingLetters.includes(word[j])) && (word[j] !== missingLorem[j])) {
            remainingLetters = remainingLetters.replace(word[j], '')
            tilesList[(currentTile - 5) + j].style.background = "yellow"
            yellowList.push(word[j])
        }
    }
    for (let y = 0; y < yellowList.length; y++){
        let idName = yellowList[y]
        let temp = document.getElementById(idName)
        temp.style.background = "yellow"
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
    document.getElementById('gameboard').appendChild(notValidMessage)
}

// Removes the notValid message
function removeNotValid() {
    let m = document.getElementsByClassName('not-valid')
    m[0].remove('div')
}

// Displays a winning message
function displayWinMessage() {
    let w = document.createElement("div")
    w.classList.add('win-message')
    if (guessOn === 1) {
        w.innerText = `Lorem Einstein!`
    }
    else if (guessOn === 2) {
        w.innerText = `Genius!`
    }
    else if (guessOn === 3) {
        w.innerText = `Impressive!`
    }
    else if (guessOn === 4) {
        w.innerText = `Not too bad!`
    }
    else if (guessOn === 5) {
        w.innerText = `Yessz!`
    }
    else if (guessOn === 6) {
        w.innerText = `Phew~ you got it`
    }
    document.querySelector('body').appendChild(w)
}

// Displays a loss message
function displayLostMessage() {
    let w = document.createElement("div")
    w.classList.add('lost-message')
    w.innerText = `Nice try! The word was "${missingLorem}"`
    document.getElementById('gameboard').appendChild(w)
}

// Displays a "Not enough letters" message
function notEnough(){
    let m = document.createElement("div")
    m.classList.add('not-enough')
    m.innerText = `Not enough letters`
    document.querySelector('body').appendChild(m)
}

// Removes the notEnough message
function removeNotEnough() {
    let m = document.getElementsByClassName('not-enough')
    m[0].remove('div')
}