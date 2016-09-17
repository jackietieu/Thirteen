import Hand from './hand';

class HumanPlayerObj{
  constructor(cardIds){
    this.hand = new Hand(cardIds, 0);
    this.selectedHand = undefined;
    this.kickout = false;
    this.pass = false;
    this.playedCards = undefined;
  }

  hand(){
    return this.hand;
  }

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  // makeMove(currentPlay){
  //   console.log('change humanplayerobj makemove from pass');
  //   return "pass";
  // }

  makeMove(currentPlay){
    console.log('waiting for human input');
    this.sleep(1000).then(() => {
      if (this.kickout === false) {
        this.makeMove(currentPlay);
      } else {
        //kickout because pass or cards were played
        // console.log('pass');
        if (this.pass === true){
          this.kickout = false;
          this.pass = false;
          return "pass";
        } else {
          this.kickout = false;
          this.pass = false;
          //cards were played, return currentPlay obj

          return this.playedCards.validPlay(currentPlay);
        }
      }
    });
  }
}

export default HumanPlayerObj;
