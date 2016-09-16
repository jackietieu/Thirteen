import Hand from './hand';

class HumanPlayerObj{
  constructor(cardIds){
    this.hand = new Hand(cardIds, 0);
  }

  hand(){
    return this.hand;
  }

  makeMove(currentPlay){
    console.log('change humanplayerobj makemove from pass');
    return "pass";
  }
}

export default HumanPlayerObj;
