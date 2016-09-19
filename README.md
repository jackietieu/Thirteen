#Thirteen

[Thirteen live][github_link]

[github_link]: http://jackietieu.github.io/Thirteen/root.html

Thirteen is a classic Vietnamese card game that also goes by the name of Big Two. This web app utilizes ReactJS to quickly render the appropriate components. Currently, it features an AI simulation between four players using basic rules of the game.

## Features & Implementation

### Rules of the Game

  - Player with the Three of Spades starts first
  - Play continues in clockwise direction
  - Cards are only playable if it is higher in value
  - Threes are the lowest in value and Twos are the highest in value
  - In case of a tiebreaker, the stronger suit wins
  - Hearts are the highest in rank, followed by Diamonds, Clubs and Spades
  - When there are no playable cards, the player must pass
  - First one to play all of their cards wins!

### Recursive Callback Event Loop

  The game's event loop is implemented by using recursive callbacks between `this.nextMoveSameRound()` and `this.nextRound()`. A sleep timer using `Promise` and `setTimeout` is implemented in order to slow down the AI so that its can be tracked down by humans.

  ```.js
    nextMoveSameRound(){
      this.sleep(2000).then(() => {
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
          this.setState({ currentPlayersInRound: currentPlayers, bestCurrentPlay: move }, () => {
            if (possibleWinner.hand.cards.length === 0) {
              alert(`Player ${possibleWinner.id} won!`);
              return;
            }
            this.nextMoveSameRound();
          });
        }
      });
    }
  ```

### AI Logic

  The AI Logic is run based on what moves are currently in play. `this.state.bestCurrentPlay` contains the `type` of play in the round (i.e. "single" cards), `cards` which contains the current `card` objects in play, and the `kicker` that is the highest valued card of the played `cards`. AI logic runs according to a switch statement that is produced by the `hand` object when checking for a `validPlay`:

```.js
  validPlay(currentPlay){
    switch (currentPlay.type) {
      case "start":
        let spades3idx = this.cards.indexOf(this.cards.find(card => (
          card.i === 2
        )));
        let startingPlay = {
          type: "single",
          cards: [new CardObj(2)],
          kicker: this.cards.splice(spades3idx, 1)[0],
          playerId: this.offsetPlayerId
        };

        return startingPlay;
      case "single":
        let betterCardIdx = this.cards.indexOf(this.cards.find(card => (
          card.kickerRank > currentPlay.cards[0].kickerRank
        )));

        if (betterCardIdx === -1) {
          return "pass";
        } else {
          let betterCardId = this.cards[betterCardIdx].i;

          let nextPlay = {
            type: "single",
            cards: [this.cards[betterCardIdx]],
            kicker: this.cards.splice(betterCardIdx, 1)[0],
            playerId: this.offsetPlayerId
          };

          return nextPlay;
        }
      case "newRound":
        let nextPlay = {
          type: "single",
          cards: [this.cards[0]],
          kicker: this.cards.splice(0, 1)[0],
          playerId: this.offsetPlayerId
        };

        return nextPlay;
      default:
        return "pass";
    }
  }}
```

### To-Dos
 - [ ] Add extra rules for the AI
 - [ ] Integrate Human Player UI
