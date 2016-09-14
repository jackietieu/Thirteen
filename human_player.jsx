import React from 'react';

class HumanPlayer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hand: this.createCards(this.props.hand),
      currentSelection: [],
      currentPlay: []
    };
  }

  selectCard(e){
    e.preventDefault();

    if (!e.currentTarget.classList.contains('selected')) {
      this.setState({
        currentSelection: this.state.currentSelection.concat(e.currentTarget.className)
      });
    } else {
      let idx = this.state.currentSelection.indexOf(e.currentTarget.className.slice(0, e.currentTarget.className.length - 9));
      let tempSelection = this.state.currentSelection;
      tempSelection.splice(idx, 1);
      this.setState({
        currentSelection: tempSelection
      });
    }
    e.currentTarget.classList.toggle('selected');
  }

  createCards(hand){
    //CONSIDER MAKING UL/LI LIST INSTEAD
    const suits = ["spades", "clubs", "diamonds", "hearts"];

    return(
      hand.map((i, idx) => {
        let rank = " rank".concat(i % 13 + 1);
        let suit = suits[i / 13 | 0];
        let offset = {"left":`calc(30px + ${idx * 30}px)`};

        return(
          <div
            style={offset}
            key={"card ".concat(suit).concat(rank)}
            className={"card ".concat(suit).concat(rank)}
            onClick={this.selectCard.bind(this)}>
            <div key={"face ".concat(suit).concat(rank)} className="face"></div>
          </div>
        );
      })
    );
  }

  playCards(cards){

  }

  render(){
    return (
      <div className="human-player">
        <div className="human-player-hand">
          {this.state.hand}
          <button className="play-button" value="Play Hand">
            <span>Play Hand!</span>
          </button>
        </div>

        <div className="human-player-played-hand">
          {this.state.currentPlay}
        </div>
      </div>
    );
  }
}

export default HumanPlayer;
