// List of words to choose from
const words = [
  "Benin",
  "Egypt",
  "Gabon",
  "Ghana",
  "Kenya",
  "Libya",
  "Niger",
  "Sudan",
  "Chile",
  "China",
  "Haiti",
  "India",
  "Italy",
  "Japan",
  "Malta",
  "Nauru",
  "Nepal",
  "Palau",
  "Qatar",
  "Samoa",
  "Spain",
  "Syria",
  "Tonga",
  "Yemen",
];

// Select a random word from the list
const word = words[Math.floor(Math.random() * words.length)];

// Initialize the game state
const state = {
	word: word,
	guesses: [],
	maxGuesses: 10,
};

// Get references to DOM elements
const wordBoxes = document.querySelectorAll(".word-box");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");

// Update the display of the word boxes
function updateWordBoxes() {
	for (let i = 0; i < state.word.length; i++) {
		wordBoxes[i].textContent = state.guesses.includes(state.word[i]) ? state.word[i] : "";
	}
}

// Check if the player has won
function checkWin() {
	return state.word.split("").every((letter) => state.guesses.includes(letter));
}

// Handle a guess from the player
function handleGuess() {
	const guess = guessInput.value.toLowerCase();
	if (!guess.match(/^[a-z]$/)) {
		alert("Please enter a single letter.");
		return;
	}
	if (state.guesses.includes(guess)) {
		alert("You already guessed that letter.");
		return;
	}
	state.guesses.push(guess);
	updateWordBoxes();
	if (checkWin()) {
		alert("You win!");
		window.location.reload();
	}
	else if (state.guesses.length >= state.maxGuesses) {
		alert("You lose! The word was " + state.word + ".");
		window.location.reload();
	}
}

// Add event listeners to the input and button
guessInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		handleGuess();
	}
});

guessButton.addEventListener("click", () => {
	handleGuess();
});

// Initialize the display
updateWordBoxes();
