import React from 'react';
import HandCard from './hand_card';

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
    let key = (play === "play") ? " play" : " hand";

    let cards = hand.sort((a, b) => (
      a - b
    )).map((i, idx) => (
      <HandCard
        i={i}
        idx={idx}
        key={"card ".concat(i).concat(` ${idx}`)}
        selectCard={this.selectCard.bind(this)} />
    ));

    return cards;
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
    debugger;
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
