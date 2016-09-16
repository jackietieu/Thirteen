import Hand from './hand';

class ComputerPlayerObj{
  constructor(id, cardIds){
    this.hand = new Hand(cardIds, id);
  }

  //currentPlayType = single, pair, triple, quad, n-sequence
  makeMove(currentPlay){
    console.log('cpumove');
    switch (currentPlay.type) {
      //currentPlay is obj with `type` string and `kicker` cardobj properties
      case "start":
        //will always be able to play 3 of spades
        //if else statement
        //if (this.hand.validPlay("single"), then return an cardobj
        //ALSO MUST UPDATE THIS.HAND TO NEW HAND OBJ, DISCOUNTING THROWN CARDS
        //else return "pass"
        //because can't play current round
        return this.hand.validPlay(currentPlay);
      case "single":
        let play = this.hand.validPlay(currentPlay);
        if (play) {
          return play;
        } else {
          return "pass";
        }
      case "newRound":
        return this.hand.validPlay(currentPlay);
      // case "pair":
      //   if (this.hand.validPlay("pair")) {
      //     return this.hand.validPlay("pair");
      //   } else {
      //     return "pass";
      //   }
      // case "triple":
      //   if (this.hand.validPlay("triple")) {
      //     return this.hand.validPlay("triple");
      //   } else {
      //     return "pass";
      //   }
      // case "quad":
      //   if (this.hand.validPlay("quad")) {
      //     return this.hand.validPlay("quad");
      //   } else {
      //     return "pass";
      //   }
      // case "n-sequence":
      //   let sequenceLength = parseInt(currentPlayType[0]);
      default:
        return "pass";
    }
  }

  hand(){
    return this.hand;
  }
}

export default ComputerPlayerObj;
