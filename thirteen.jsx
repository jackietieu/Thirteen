import React from 'react';
import ReactDOM from 'react-dom';
import HumanPlayer from './human_player';
import ComputerPlayer from './computer_player';

class PlayingFieldComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      players: [0, 1, 2, 3],
      currentPlayersInRound: [0, 1, 2, 3]
    };
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

    return shuffled;
  }

  render() {
    let shuffledDeck = this.shuffleDeck();

    return(
      <section className="playing-field">
        <ComputerPlayer player={2} hand={shuffledDeck.slice(13, 26).sort()} />

        <div className="left-right players">
          <ComputerPlayer player={1} hand={shuffledDeck.slice(26, 39).sort()} />
          <ComputerPlayer player={3} hand={shuffledDeck.slice(39, 52).sort()} />
        </div>

        <HumanPlayer player={0} hand={shuffledDeck.slice(0, 13).sort()}/>
      </section>
    );
  }
}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<PlayingFieldComponent/>, document.getElementById('root'));
});
