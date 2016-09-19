import PlayerHandObj from './player_hand_obj';

class HumanPlayerObj{
  constructor(cardIds){
    this.hand = new PlayerHandObj(cardIds, 0);
    this.selectedHand = undefined;
    this.kickout = false;
    this.pass = false;
    this.playedCards = undefined;
  }

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  // makeMove(currentPlay){
  //   console.log('change humanplayerobj makemove from pass');
  //   return "pass";
  // }

  makeMove(currentPlay){
    if (this.kickout === true) {
      let play = this.playedCards.validPlay(currentPlay);
      return play;
    }

    this.sleep(500).then(() => {
      if (this.kickout === false) {
        // console.log('waiting for human input');
        return this.makeMove(currentPlay);
      } else {
        //kickout because pass or cards were played
        // console.log('pass');

        if (this.pass === true){
          // this.kickout = false;
          // this.pass = false;
          return "pass";
        } else {
          // this.kickout = false;
          // this.pass = false;
          //cards were played, return currentPlay obj
          // return "pass";

          //THIS SHOULD RETURN A CURRENTPLAY OBJECT
          //'validPlay' should actually be checked by
          //human_player.jsx component on frontend
          let play = this.playedCards.validPlay(currentPlay);
          return play;
        }
      }
    });
  }
}

export default HumanPlayerObj;
