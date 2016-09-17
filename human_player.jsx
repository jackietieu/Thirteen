import React from 'react';
import HandCard from './hand_card';
import Hand from './ThirteenJS/hand';
import CardObj from './ThirteenJS/card_obj';
import PlayerHandObj from './ThirteenJS/player_hand_obj';

class HumanPlayer extends React.Component{
  constructor(props){
    super(props);

    this.currentPlayToBeat = this.props.currentPlayToBeat;

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

    this.props.playerObj.selectedHand = new PlayerHandObj(selectedCardIds);
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

    let newHand = new PlayerHandObj(newHandCardIds, 0);
    let playedCards = new PlayerHandObj(removeHandCardIds, 0);

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
    if (this.state.currentSelection.includes(2)) {
      //human has 3 of spades, first player
      return false;
    }

    //single card selection for now
    //grab id

    let singleCard = new CardObj(this.state.currentSelection[0]);
    if (singleCard.kickerRank > this.currentPlayToBeat.kicker.kickerRank) {
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
