const gameContainer = document.getElementById("game");
let base_poke_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
let board_size = 5;
let poke_id = create_poke_id_array(5)
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

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

let shuffledPokeIds = shuffle(poke_id);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(emojiArray) {
  for (let emoji of emojiArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(emoji);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", e.target);
  if (noClicking === true) return;
  if (e.target.classList.contains('flipped')) return;

  // Card click listener
  let currentCard = e.target;
  let emoji = currentCard.classList[0];
  currentCard.style.backgroundImage = `url(${base_poke_url}${emoji}.png)`;

  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    noClicking = true;
    let gif1 = card1.className;
    let gif2 = card2.className;

    if (gif1 === gif2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundImage  = '';
        card2.style.backgroundImage  = '';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000)
    }
  }

  if (cardsFlipped === poke_id.length) alert('Winner!!!');

}

//A board_size = 5 would produce a 5x5 board
function create_poke_id_array(board_size){
  var poke_array = []
  for(let i=0;i<board_size;i++){


    poke_array.push(getRandomIntInclusive(1,100));
  
  }
  poke_array  = poke_array.reduce(function (res, current, index, array) {
    return res.concat([current, current]);
  }, []);
  return poke_array;
}


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


// when the DOM loads
createDivsForColors(shuffledPokeIds);

