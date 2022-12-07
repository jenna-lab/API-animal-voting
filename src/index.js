document.addEventListener("DOMContentLoaded", () => {
  fetchAnimals();
});
function fetchAnimals() {
  fetch("http://localhost:3000/characters")
    .then((resp) => resp.json())
    .then(characterBar);
}
function characterBar(characters) {
  characters.forEach(barDetails);
}
//clicked animal
let currentAnimal;
function barDetails(character) {
  const bar = document.querySelector("#character-bar");
  const barSpan = document.createElement("span");
  barSpan.innerHTML = character.name;
  bar.appendChild(barSpan);
  barSpan.style.cursor = "pointer";
  barSpan.addEventListener("click", () => {
    currentAnimal = character;
    showAnimal(character);
  });
}
//function to show the different animals
function showAnimal(character) {
  const characterName = document.querySelector("p#name");
  characterName.innerHTML = character.name;
  const characterImg = document.querySelector("img#image");
  characterImg.src = character.image;
  const characterVotes = document.querySelector("span#vote-count");
  characterVotes.textContent = character.votes;
}
//adding votes
const inputVotes = document.querySelector("input#votes");
const animalVotes = document.querySelector("span#vote-count");
const form = document.querySelector("form#votes-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(currentAnimal);
  currentAnimal.votes += parseInt(e.target.votes.value, 10);
  //we update vvotes,,showAnimal() passes the update to our page
  showAnimal(currentAnimal);
  form.reset();
});

//reset button function
const resetVotes = document.querySelector("button#reset-btn");
resetVotes.style.cursor = "pointer";
resetVotes.addEventListener("click", () => {
  currentAnimal.votes = 0;
  showAnimal(currentAnimal);
  form.reset();
});
