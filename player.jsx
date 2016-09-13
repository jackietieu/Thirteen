import React from 'react';

class Player extends React.Component{
  constructor(player, hand){
    this.state = {
      hand: this.createCards(hand),
      currentPlay: []
    };

    this.suits = ["spades", "clubs", "diamonds", "hearts"];
    this.player = player;
  }

  createCards(hand){
    //CONSIDER MAKING UL/LI LIST INSTEAD
    return(
      hand.map(i => {
        let rank = " rank".concat(i % 13 + 1);
        let suit = this.suits[i / 13 | 0];

        return(
          <div key={"card ".concat(suit).concat(rank)} className={"card ".concat(suit).concat(rank)}>
            <div key={"face ".concat(suit).concat(rank)} className="face"></div>
          </div>
        );
      })
    );
  }

  render(){
    // let hand = this.hand;
    // let currentPlay = this.currentPlay;

    return (
      <div className={this.player}>
        {this.hand}
        {this.currentPlay}
      </div>
    );
  }
}

export default Player;
