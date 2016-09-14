import React from 'react';
import ReactDOM from 'react-dom';
import HumanPlayer from './human_player';
import ComputerPlayer from './computer_player';

class PlayingFieldComponent extends React.Component {
  constructor(props){
    super(props);
    this.startingRotation = [];
    this.shuffledDeck = this.shuffleDeck();

    this.state = {
      currentPlayersInRound: this.startingRotation,
      bestCurrentPlay: []
    };

    this.run();
  }

  shuffleDeck(){
    let deck = Array(52).fill().map((_, i) => i);
    let shuffled = [];

    while (shuffled.length !== 52) {
      let idx = Math.floor(deck.length * Math.random());

      if (!shuffled.includes(deck[idx])) {
        shuffled.push(deck[idx]);
      }
    }

    let firstPlayerIdx = shuffled.indexOf(2) / 13 | 0;
    let rotation = [0, 1, 2, 3];
    this.startingRotation = rotation.splice(firstPlayerIdx, rotation.length).concat(rotation.splice(0, firstPlayerIdx));

    return shuffled;
  }

  run(){
    this.state.currentPlayersInRound;
    // this.nextPlayer();
  }

  nextPlayer(){
    let currentPlayers = this.state.currentPlayersInRound;
    currentPlayers.push(currentPlayers.shift());
    this.setState({ currentPlayersInRound: currentPlayers });
    console.log(this.state.currentPlayersInRound);
    //make a pass button/function
  }

  render(){
    return(
      <section className="playing-field">
        <ComputerPlayer
          player={2}
          hand={this.shuffledDeck.slice(26, 39).sort()} />

        <div className="left-right players">
          <ComputerPlayer
            player={1}
            hand={this.shuffledDeck.slice(13, 26).sort()} />
          <div className="played-cards">

          </div>
          <ComputerPlayer
            player={3}
            hand={this.shuffledDeck.slice(39, 52).sort()} />
        </div>

        <HumanPlayer
          player={0}
          hand={this.shuffledDeck.slice(0, 13).sort()} />
      </section>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<PlayingFieldComponent />, document.getElementById('root'));
});
