import Hand from './hand';

class ComputerPlayerObj{
  constructor(id, cardIds){
    this.id = id;
    this.hand = new Hand(cardIds, id);
  }

  makeMove(currentPlay){
    return this.hand.validPlay(currentPlay);
  }
}

export default ComputerPlayerObj;
