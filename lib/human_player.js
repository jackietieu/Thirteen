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
          clearInterval(move);
          let play = this.playedCards.validPlay(currentPlay);
          return callback(play);
    }}}, 200);
  }
}

export default HumanPlayerObj;
