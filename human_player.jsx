import React from 'react';

class HumanPlayer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      handCardIds: this.props.hand,
      hand: this.createCards(this.props.hand),
      currentSelection: [],
      currentPlay: []
    };
  }

  selectCard(e){
    e.preventDefault();

    if (!e.currentTarget.classList.contains('selected')) {
      this.setState({
        currentSelection: this.state.currentSelection.concat(parseInt(e.currentTarget.id))
      });
    } else {
      let idx = this.state.currentSelection.indexOf(e.currentTarget.id);
      let tempSelection = this.state.currentSelection;
      tempSelection.splice(idx, 1);
      this.setState({
        currentSelection: tempSelection
      });
    }

    e.currentTarget.classList.toggle('selected');
  }

  createCards(hand, play){
    //CONSIDER MAKING UL/LI LIST INSTEAD
    const suits = ["spades", "clubs", "diamonds", "hearts"];
    // console.log(hand);

    return(
      hand.sort((a, b) => (
        a - b
      )).map((i, idx) => {
        let rank = " rank".concat(i % 13 + 1);
        let suit = suits[i / 13 | 0];
        let offset = {"left":`calc(30px + ${idx * 30}px)`};
        let key = (play === "play") ? " play" : " hand";

        return(
          <div
            id={i}
            style={offset}
            key={"card ".concat(suit).concat(rank)}
            className={"card ".concat(suit).concat(rank)}
            onClick={this.selectCard.bind(this)}>
            <div key={"face ".concat(suit).concat(rank).concat(play)} className="face"></div>
          </div>
        );
      })
    );
  }

  playCards(e){
    e.preventDefault();
    let oldHandCardIds = this.state.handCardIds;
    let removeHandCardIds = this.state.currentSelection;
    let newHandCardIds = [];

    oldHandCardIds.map(id => {
      if (!removeHandCardIds.includes(id)) {
        newHandCardIds.push(id);
      }
    });

    this.setState({
      handCardIds: newHandCardIds,
      hand: this.createCards(newHandCardIds),
      currentPlay: this.createCards(removeHandCardIds, "play"),
      currentSelection: []
    });
  }

  validPlay(){
    if (this.state.currentSelection.includes(2)) {
      //human has 3 of spades, first player
      return false;
    } else {
      //human has to play according to the current round's cards
      return true;
    }
  }

  render(){
    let disabled = this.validPlay();

    return (
      <div className="human-player">
        <div className="human-player-hand">
          {this.state.hand}
          <button disabled={disabled} className="play-button" value="Play Hand" onClick={this.playCards.bind(this)}>
            <span>Play Hand!</span>
          </button>

          <div className="human-player-played-hand">
            {this.state.currentPlay}
          </div>
        </div>
      </div>
    );
  }
}

export default HumanPlayer;
