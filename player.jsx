import React from 'react';

class Player extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hand: this.createCards(this.props.hand),
      currentPlay: []
    };

    this.player = this.props.player;
  }

  createCards(hand){
    //CONSIDER MAKING UL/LI LIST INSTEAD
    const suits = ["spades", "clubs", "diamonds", "hearts"];

    return(
      hand.map((i, idx) => {
        let rank = " rank".concat(i % 13 + 1);
        let suit = suits[i / 13 | 0];

        let offset = {"left":`calc(40% + ${idx * 2}%)`};
        console.log(offset);

        return(
          <div
            style={offset}
            key={"card ".concat(suit).concat(rank)}
            className={"card ".concat(suit).concat(rank)}>
            <div key={"face ".concat(suit).concat(rank)} className="face"></div>
          </div>
        );
      })
    );
  }

  render(){
    console.log(this.state.hand);
    return (
      <div className={this.player}>
        <div className={this.player.concat(" hand")}>
          {this.state.hand}
        </div>

        <div className={this.player.concat(" played-hand")}>
          {this.state.currentPlay}
        </div>
      </div>
    );
  }
}

export default Player;
