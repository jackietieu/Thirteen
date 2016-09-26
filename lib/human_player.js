import PlayerHandObj from './player_hand_obj';

class HumanPlayerObj{
  constructor(cardIds){
    this.hand = new PlayerHandObj(cardIds, 0);
    this.selectedHand = undefined;
    this.kickout = false;
    this.pass = false;
    this.playedCards = undefined;
    this.id = 0;
  }

  makeMove(currentPlay, callback){
    let move;
    console.log('human move');
    move = setInterval(() => {
      console.log('waiting for human input');
      if (this.kickout === true) {
        if (this.pass === true){
          //passing
          this.kickout = false;
          this.pass = false;
          console.log('clear');
          clearInterval(move);
          return "pass";
        } else {
          //valid move made
          this.kickout = false;
          this.pass = false;
          //THIS SHOULD RETURN A CURRENTPLAY OBJECT
          //'validPlay' should actually be checked by
          //human_player.jsx component on frontend
          clearInterval(move);
          console.log('clear');
          let play = this.playedCards.validPlay(currentPlay);
          return callback(play);
    }}}, 200);
  }
}

export default HumanPlayerObj;
