import Hand from './hand';

class ComputerPlayerObj{
  constructor(id, cardIds){
    this.id = id;
    this.hand = new Hand(cardIds, id);
  }

  //currentPlayType = single, pair, trio, quad, n-sequence
  makeMove(currentPlay){
    let play;
    switch (currentPlay.type) {
      case "start":
        return this.hand.validPlay(currentPlay);
      case "pair":
        play = this.hand.validPlay(currentPlay);
        if (play) {
          return play;
        } else {
          return "pass";
        }
      case "single":
        play = this.hand.validPlay(currentPlay);
        if (play) {
          return play;
        } else {
          return "pass";
        }
      case "newRound":
        return this.hand.validPlay(currentPlay);
      default:
        return "pass";
    }
  }
}

export default ComputerPlayerObj;
