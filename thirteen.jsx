import React from 'react';
import ReactDOM from 'react-dom';
import HumanPlayer from './human_player';
import ComputerPlayer from './computer_player';
import ComputerPlayerObj from './ThirteenJS/computer_player';
import HumanPlayerObj from './ThirteenJS/human_player';

class PlayingFieldComponent extends React.Component {
  constructor(props){
    super(props);
    this.startingRotation = [];
    this.shuffledDeck = this.shuffleDeck();

    this.players = [
      new HumanPlayerObj(this.shuffledDeck.slice(0, 13).sort()),
      new ComputerPlayerObj(1, this.shuffledDeck.slice(13, 26)),
      new ComputerPlayerObj(2, this.shuffledDeck.slice(26, 39)),
      new ComputerPlayerObj(3, this.shuffledDeck.slice(39, 52))
    ];

    this.state = {
      players: this.players,
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
    //make a pass button/function
  }

  render(){
    return(
      <section className="playing-field">
        <ComputerPlayer
          playerId={2}
          playerObj={this.state.players[2]} />
        <div className="left-right players">
          <ComputerPlayer
            playerId={1}
            playerObj={this.state.players[1]} />
          <div className="played-cards">

          </div>
          <ComputerPlayer
            playerId={3}
            playerObj={this.state.players[3]} />
        </div>

        <HumanPlayer
          playerId={0}
          playerObj={this.state.players[0]} />
      </section>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<PlayingFieldComponent />, document.getElementById('root'));
});
