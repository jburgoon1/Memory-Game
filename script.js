const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null; 

let cardsflipped = 0
let clicking = false;
let start = document.querySelector('.start')



const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


// TODO: Implement this function!
function handleCardClick(event) {
 if (clicking) return;
 if(event.target.classList.contains('flipped')) return;
 
 let current = event.target;
 current.style.backgroundColor = current.classList[0];
 
if (!card1 || !card2){
  current.classList.add('flipped');
  card1 = card1 || current;
  if(current === card1){
    card2 = null
  }else{
    card2 = current
  }
}

if (card1 && card2){
  
  clicking = true;
  let card1Compare = card1.className;
  let card2Compare = card2.className;
  if(card1Compare === card2Compare){
    cardsflipped +=2
    card1.removeEventListener('click', handleCardClick)
    card2.removeEventListener('click', handleCardClick)
    card1= null;
    card2 = null;
    clicking = false;
  }else{
    setTimeout(function(){
      card1.style.backgroundColor = '';
      card2.style.backgroundColor = '';
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1= null;
      card2 = null;
      clicking = false;
    },1000)
  }
}

if(cardsflipped === COLORS.length){
  alert('game over')
}


  // you can use event.target to see which element was clicked
  console.log("click", card1, card2);
 
}

  


// when the DOM loads
createDivsForColors(shuffledColors);
