import React from 'react';
import HandCard from './hand_card';
import HandObj from './lib/hand';
import CardObj from './lib/card_obj';

class HumanPlayer extends React.Component{
  constructor(props){
    super(props);

    this.currentPlayToBeat = this.props.currentPlayToBeat;
    this.playerId = 0;

    this.state = {
      handCardIds: this.props.playerObj.hand.cardIds,
      hand: this.createCards(this.props.playerObj.hand.cards),
      currentSelection: [],
      currentPlay: []
    };
  }

  componentWillReceiveProps(nextProps){
    this.currentPlayToBeat = nextProps.currentPlayToBeat;
  }

  selectCard(e){
    e.preventDefault();

    if (!e.currentTarget.classList.contains('selected')) {
      this.setState({
        currentSelection: this.state.currentSelection.concat(parseInt(e.currentTarget.id))
      });
    } else if (e.currentTarget.classList.contains('selected')) {
      let idx = this.state.currentSelection.indexOf(parseInt(e.currentTarget.id));
      let tempSelection = [].concat(this.state.currentSelection);
      tempSelection.splice(idx, 1);
      this.setState({
        currentSelection: tempSelection
      });
    }

    e.currentTarget.classList.toggle('selected');

    let selectedCards = document.querySelectorAll("selected");
    let selectedCardIds = [];

    selectedCards.forEach(cardDiv => (
      selectedCardIds.push(parseInt(cardDiv.id))
    ));

    this.props.playerObj.selectedHand = new HandObj(selectedCardIds);
  }

  createCards(hand){
    let cards = hand.sort((a, b) => (
      a.val - b.val
    )).map((card, idx) => (
      <HandCard
        i={card.i}
        idx={idx}
        key={"card ".concat(card.i).concat(` ${idx}`)}
        offset={{"left":`calc(30px + ${idx * 30}px)`}}
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

    let newHand = new HandObj(newHandCardIds, 0);
    let playedCards = new HandObj(removeHandCardIds, 0);

    this.setState({
      handCardIds: newHandCardIds,
      hand: this.createCards(newHand.cards),
      currentPlay: this.createCards(playedCards.cards),
      currentSelection: []
    }, () => {
      this.props.playerObj.playedCards = playedCards;
      this.props.playerObj.kickout = true;
    }
  );
  }

  validPlay(){
    if (this.state.currentSelection.includes(2) && this.state.currentSelection.length === 1) {
      return false;
    }

    //should rely on HANDOBJ.validPlay(), just like CPU
    //will pass back undefined or a currentPlay obj
    //translate to true/false for button display
    //clicking play runs the same function but will actually 'play' validPlay now

    let singleCard = new CardObj(this.state.currentSelection[0]);

    if (this.currentPlayToBeat && singleCard.kickerRank > this.currentPlayToBeat.kicker.kickerRank) {
     return false;
    } else {
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
