#Thirteen

[Thirteen live][github_link]

[github_link]: http://jackietieu.github.io/Thirteen/root.html

Thirteen is a classic Vietnamese card game that also goes by the name of Big Two. This web app utilizes ReactJS to quickly render the appropriate components.

This app makes use of JavaScript, ReactJS, HTML/CSS and Chris Aguilar's [vector playing cards][card_link].

[card_link]: http://sourceforge.net/projects/vector-cards/

## Features & Implementation

### Rules of the Game

  - Player with the Three of Spades starts first!
  - The first play of the game must be a valid combination that includes the Three of Spades
  - Valid combinations are consecutive sequences of 3+ cards, four-of-a-kinds, three-of-a-kinds, pairs, and single cards
  - Play continues in clockwise direction
  - All players must beat the previous combo by playing a similar type of combo that is higher in value
  - Threes are the lowest in value and Twos are the highest in value
  - In case of a tiebreaker, the stronger suit wins
  - Hearts are the highest in rank, followed by Diamonds, Clubs and Spades
  - When there are no playable cards, the player must pass and wait until the next round to start
  - When all but one player passes, that player gets to start the next round with any combination
  - First one to play all of their cards wins!

![sample screenshot](http://res.cloudinary.com/dnmknegr2/image/upload/v1475520326/Screen_Shot_2016-10-03_at_11.44.11_AM_ozi5ez.png)

### Recursive Callback Event Loop

  The game's event loop is implemented by using recursive callbacks between `this.nextMoveSameRound()` and `this.nextRound()`. A sleep timer using `setTimeout` is implemented in order to slow down the AI so that its moves can be tracked down by humans.

  ```.js
    nextMoveSameRound(){
      setTimeout(() => {
        let currentPlayers = [].concat(this.state.currentPlayersInRound);
        let move = currentPlayers[0].makeMove(this.state.bestCurrentPlay);
        if (move === "pass"){
          this.setState({ currentPlayersInRound: currentPlayers.slice(1, currentPlayers.length)},
          () => {
            if(this.state.currentPlayersInRound.length > 1){
              return this.nextMoveSameRound();
            } else {
              return this.nextRound();
            }
          }
        );
      } else {
        let possibleWinner = currentPlayers[0];
        currentPlayers.push(currentPlayers.shift());
        this.setState({
          currentPlayersInRound: currentPlayers,
          bestCurrentPlay: move }, () => {
          if (possibleWinner.hand.cards.length === 0) {
            alert(`Player ${possibleWinner.id} won!`);
            return;
          }

          return this.nextMoveSameRound();
        }
      );
    }
  }, 2000);
    }
  ```

### AI Logic

  The AI Logic is run based on what moves are currently in play. `this.state.bestCurrentPlay` contains the `type` of play in the round (i.e. "single" cards), `cards` which contains the current `card` objects in play, and the `kicker` that is the highest valued card of the played `cards`. AI logic runs according to a switch statement that is produced by the `hand` object when checking for a `validPlay`. Here is a code snippet of how I got the AI to play the longest consecutive sequence of cards in its hand:

```.js
case "sequence":
  if (currentPlay.sequenceLength === "n") {
    let sequenceValues = this.cards.sort((card1, card2) => (
      card1.val - card2.val
    )).map(card => (card.val));

    let uniqueSequenceValues = [...new Set(sequenceValues)];
    let maxSequenceLength = uniqueSequenceValues.length;
    let subSequenceMin = Math.min(...uniqueSequenceValues);
    let validSequence = Array.from(new Array(maxSequenceLength), (x, k) => k + subSequenceMin);

    if (this.cards.length < 3) {
      return "pass";
    } else if (this.offsetPlayerId === 0) {
      if (uniqueSequenceValues.toString() !== validSequence.toString()) {
        return "pass";
      }
    }

    for (let i = maxSequenceLength; i >= 3; i--) {
      for (let j = 0; (j + i) <= uniqueSequenceValues.length; j++) {
        let subSequence = uniqueSequenceValues.slice(j, j + i);
        let subSequenceMax = Math.max(...subSequence);
        subSequenceMin = Math.min(...subSequence);
        validSequence = Array.from(new Array(i), (x, k) => k + subSequenceMin);

        if (subSequence.toString() === validSequence.toString()) {
          let reversedCards = this.cards.sort((card1, card2) => (
            card2.val - card1.val
          ));
          let sequenceKicker = reversedCards.find(card => card.val === subSequenceMax);

          if ((sequenceKicker.kickerRank < currentPlay.kicker.kickerRank)) {
            continue;
          } else if ((currentPlay.start) === true && (subSequence[0] !== 3)) {
            continue;
          }

          subSequence.splice(subSequence.length - 1);
          subSequence.forEach(val => {
            let seqCard = this.cards.find(card => card.val === val);
            playableCards.push(seqCard);
            let seqCardIdx = this.cards.indexOf(seqCard);
            this.cards.splice(seqCardIdx, 1);
          });

          playableCards.push(sequenceKicker);
          let cardIdx = this.cards.indexOf(sequenceKicker);
          this.cards.splice(cardIdx, 1);
          return {
            type: "sequence",
            sequenceLength: playableCards.length,
            cards: playableCards,
            kicker: sequenceKicker,
            playerId: this.offsetPlayerId
          };
        }
      }
    }
  }
```

### To-Dos
 - [ ] Add Bombs to the game: a sequence of 3 consecutive pairs can beat a single 2
