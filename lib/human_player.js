import HandObj from './hand';

class HumanPlayerObj{
  constructor(cardIds){
    this.hand = new HandObj(cardIds, 0);
    this.selectedHand = undefined;
    this.kickout = false;
    this.pass = false;
    this.playedCards = undefined;
    this.id = 0;
  }

  makeMove(currentPlay, callback){
    let move = setInterval(() => {
      if (this.kickout === true) {
        if (this.pass === true){
          this.kickout = false;
          this.pass = false;
          clearInterval(move);
          return callback("pass");
        } else {
          this.kickout = false;
          this.pass = false;
          //PUT DEBUGGERS IN VALIDPLAY
          let play;
          if (currentPlay.playerId === 0) {
            currentPlay = {
              type: "newRound",
              cards: [],
              kicker: {},
              playerId: 0
            };
            play = this.playedCards.validPlay(currentPlay);
          } else {
            play = this.playedCards.validPlay(currentPlay);
          }
          clearInterval(move);
          return callback(play);
    }}}, 200);
  }
}

export default HumanPlayerObj;
