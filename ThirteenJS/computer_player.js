import Hand from './hand';

class ComputerPlayerObj{
  constructor(id, cardIds){
    // console.log(cardIds);
    this.hand = new Hand(cardIds, id);
    // console.log(this.hand);
  }

  hand(){
    return this.hand;
  }
}

export default ComputerPlayerObj;
