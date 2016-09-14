import React from 'react';

class ComputerPlayer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hand: this.createCards(this.props.hand),
      currentPlay: []
    };
  }

  createCards(hand){
    const suits = ["spades", "clubs", "diamonds", "hearts"];

    return(
      hand.map((i, idx) => {
        let rank = " rank".concat(i % 13 + 1);
        let suit = suits[i / 13 | 0];
        let offset;

        if (this.props.player === 2) {
          offset = {"left":`calc(140px + ${idx * 30}px)`};
        } else if (this.props.player === 1) {
          offset = {"top":`calc(120px + ${idx * 30}px)`, "left":"32.5px"};
        } else {
          offset = {"top":`calc(120px + ${idx * 30}px)`, "left":"605px"};
        }

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
      <div className={"CPU-player".concat(this.props.player)}>
        <div className={"CPU-player-hand".concat(this.props.player)}>
          {this.state.hand}
        </div>

        <div className={"CPU-player-played-hand".concat(this.props.player)}>
          {this.state.currentPlay}
        </div>
      </div>
    );
  }
}

export default ComputerPlayer;
