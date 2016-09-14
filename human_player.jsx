import React from 'react';

class HumanPlayer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hand: this.createCards(this.props.hand),
      currentPlay: []
    };
  }

  

  createCards(hand){
    //CONSIDER MAKING UL/LI LIST INSTEAD
    const suits = ["spades", "clubs", "diamonds", "hearts"];

    return(
      hand.map((i, idx) => {
        let rank = " rank".concat(i % 13 + 1);
        let suit = suits[i / 13 | 0];

        let offset = {"left":`calc(140px + ${idx * 30}px)`};

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
    return (
      <div className="human-player">
        <div className="human-player-hand">
          {this.state.hand}
        </div>

        <div className="human-player-played-hand">
          {this.state.currentPlay}
        </div>
      </div>
    );
  }
}

export default HumanPlayer;
