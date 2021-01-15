import React, { useState } from 'react';
// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle the elements in the cardDeck array
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
    // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(makeDeck());
const hand = [];
export default function App() {

  // set the default value of the deck
  const [cards, setCards] = useState(shuffleCards(makeDeck()));
  
  // set the default player hand as empty
  const [playerHand, setPlayerHand] = useState([]);
  // create computer hand and set it to empty
  const [computerHand, setComputerHand] = useState([]);
  // create the deal button click handler
  const dealCards = () => {
    hand.push(cards.pop())
    setPlayerHand(hand);
    setCards([...cards]);
    
  };

  const playHand = () => {
    const computerHand = [];
    for(let i = 0; i < playerHand.length; i += 1){
      computerHand.push(cards.pop())
    }
    setComputerHand(computerHand);
    setCards([...cards]);
  }

  console.log(playerHand, 'playerHand')
  console.log(computerHand, 'ComputerHand')
  const checkWin = () => {
    // check computer hand and playerhand to see who's rank is higher
    // if player's first card is greater than computer first card 
     let playerBiggestCard = 0;
     let computerBiggestCard = 0;
     for(let j = 0; j < playerHand.length -1 ; j +=1 ) {
      for(let k = j+1; k < playerHand.length; k += 1)
      if(playerHand[j].rank > playerHand[k].rank) {
        playerBiggestCard = playerHand[j].rank;
      } else {
        playerBiggestCard = playerHand[k].rank
      }
     }
     for(let j = 0; j < computerHand.length -1 ; j +=1 ) {
      for(let k = j+1; k < computerHand.length; k += 1)
      if(computerHand[j].rank > computerHand[k].rank) {
        computerBiggestCard = computerHand[j].rank;
      } else {
        computerBiggestCard = computerHand[k].rank
      }
     }
    if(playerBiggestCard > computerBiggestCard){
      return (
        <div>
          <h1>
            You win!
          </h1>
        </div>
      )
    } else if(computerBiggestCard > playerBiggestCard){
      return (
        <div>
          <h1>
            Computer win! You lose.. 
          </h1>
        </div>
      )
    } else {
      return(
        <div>
          <h1>
            Your hand is the same as the computer hand. It's a draw!
          </h1>
        </div>
      )
    }
  }
  const resetGame  = () => {
    setPlayerHand([]);
    setComputerHand([]);
  }
  // render the cards in the hand
  // note that when this renders the first time and the hand is
  // empty, it doesnt require and special condition
  const handEls = playerHand.map(({ name, suit }) => (
    <div>
      {name}
      {suit}
    </div>
  ));

  const computerHandEls = computerHand.map(({ name, suit }) => (
    <div>
      {name}
      {suit}
    </div>
  ));




  return (
    <div>
      <div>
        <h3> Your cards:</h3>
        {handEls}
      </div>
      <div>
        <h3> Computer Hand: </h3>
        {computerHandEls}
      </div>
      <div>
        {/* && operator will just check for condition and return but ternary operator will have an if else */}
        {playerHand.length !== 0 && computerHand.length !== 0 && checkWin()}
      </div>
      <p>
        <button onClick={dealCards}>deal</button>
        <button onClick={playHand}>Play Hand</button>
      </p>
    </div>
  );
  
}