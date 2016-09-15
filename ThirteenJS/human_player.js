import Hand from './hand';

class HumanPlayerObj{
  constructor(cardIds){
    this.hand = new Hand(cardIds, 0);
  }

  hand(){
    return this.hand;
  }
}

export default HumanPlayerObj;
