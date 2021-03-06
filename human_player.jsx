import React from 'react';
import HandCard from './hand_card';
import HandObj from './lib/hand';
import CardObj from './lib/card_obj';

class HumanPlayer extends React.Component{
  constructor(props){
    super(props);
    this.playerId = 0;
    this.state = {
      handCardIds: this.props.playerObj.hand.cardIds,
      hand: this.createCards(this.props.playerObj.hand.cards),
      currentSelection: [],
      currentPlayToBeat: this.props.currentPlayToBeat,
      playAgain: this.props.playAgain
    };
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;

    if (oldProps.playAgain != newProps.playAgain) {
      this.setState({
        playAgain: newProps.playAgain
      })
    }

    if(oldProps.playerObj.hand !== newProps.playerObj.hand) {
      this.setState({
        handCardIds: newProps.playerObj.hand.cardIds,
        hand: this.createCards(newProps.playerObj.hand.cards),
        currentSelection: [],
        currentPlayToBeat: this.props.currentPlayToBeat
      });
    } else if (oldProps.currentPlayToBeat !== newProps.currentPlayToBeat) {
      this.setState({
        currentPlayToBeat: this.props.currentPlayToBeat
      })
    }
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

  createCards(cards){
    let overlap = (13 - cards.length) * 15;
    let newHand = cards.sort((a, b) => (
      a.val - b.val
    )).map((card, idx) => {
      let offset = {"left":`calc(${(idx + 1) * 30}px + ${(13 - cards.length) * 15}px)`};
      return <HandCard
        i={card.i}
        idx={idx}
        key={"card ".concat(card.i).concat(` ${idx}`)}
        offset={offset}
        selectCard={this.selectCard.bind(this)} />;
    });

    return newHand;
  }

  playCards(e){
    e.preventDefault();
    let oldHandCardIds = this.state.handCardIds;
    let removeHandCardIds = this.state.currentSelection;
    let newHandCardIds = [];

    oldHandCardIds.forEach(id => {
      if (!removeHandCardIds.includes(id)) {
        newHandCardIds.push(id);
      }
    });

    let newHand = new HandObj(newHandCardIds, 0);
    let playedCards = new HandObj(removeHandCardIds, 0);

    this.setState({
      hand: []
    }, () => {
      this.setState({
        handCardIds: newHandCardIds,
        hand: this.createCards(newHand.cards),
        currentSelection: []
      }, () => {
        this.props.playerObj.playedCards = playedCards;
        this.props.playerObj.kickout = true;
      });
    });
  }

  validPlay(){
    let selection = [].concat(this.state.currentSelection);
    let selectedHand = new HandObj(selection, 0);

    if (selection.length === 0 || selectedHand.validPlay(this.state.currentPlayToBeat) === "pass") {
      return true;
    } else {
      return false;
    }
  }

  passHandler(e){
    e.preventDefault();
    this.props.playerObj.pass = true;
    this.props.playerObj.kickout = true;
  }

  render(){
    let disabledPlay,
        disabledPass,
        buttons;

    if (this.props.currentPlayers[0].id !== 0) {
      disabledPlay = true;
      disabledPass = true;
    } else {
      disabledPlay = this.validPlay();
      disabledPass = !disabledPlay;
    }

    if (this.props.playAgain) {
      buttons = this.props.playAgain
    } else {
      buttons = (
        <div>
          <button disabled={disabledPlay} className="play-button" onClick={this.playCards.bind(this)}>
            <span>Play Cards!</span>
          </button>
          <button disabled={disabledPass} className="pass-button" onClick={this.passHandler.bind(this)}>
            <span>Pass!</span>
          </button>
        </div>
      )
    }

    return (
      <div className="human-player">
        <div className="human-player-hand">
          {this.state.hand}
          {buttons}
        </div>
      </div>
    );
  }
}

export default HumanPlayer;
