import React from 'react';
import ReactDOM from 'react-dom';
import HumanPlayer from './human_player';
import ComputerPlayer from './computer_player';
import ComputerPlayerObj from './ThirteenJS/computer_player';
import HumanPlayerObj from './ThirteenJS/human_player';
import HandObj from './ThirteenJS/hand';
import HandCard from './hand_card';

class PlayingFieldComponent extends React.Component {
  constructor(props){
    super(props);
    this.rotation = [0, 1, 2, 3];
    this.startingRotation = [];
    this.shuffledDeck = this.shuffleDeck();

    this.player0 = new HumanPlayerObj(this.shuffledDeck.slice(0, 13).sort());
    this.player1 = new ComputerPlayerObj(1, this.shuffledDeck.slice(13, 26));
    this.player2 = new ComputerPlayerObj(2, this.shuffledDeck.slice(26, 39));
    this.player3 = new ComputerPlayerObj(3, this.shuffledDeck.slice(39, 52));

    this.initialPlayers = [
      this.player0,
      this.player1,
      this.player2,
      this.player3
    ];

    let firstPlayerIdx = this.shuffledDeck.indexOf(2) / 13 | 0;
    let rotation = [this.player0, this.player1, this.player2, this.player3];
    this.startingRotation = rotation.splice(
      firstPlayerIdx,
      rotation.length).concat(rotation.splice(0, firstPlayerIdx));

    this.resetBestCurrentPlay = {
      type: "newRound",
      cards: [],
      kicker: {}
    };

    this.state = {
      players: this.initialPlayers,
      currentPlayersInRound: this.startingRotation,
      bestCurrentPlay: {
        type: "start",
        cards: [],
        kicker: {}
      }
    };

    window.state = this.state;
  }

  componentDidMount(){
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

    return shuffled;
  }

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  nextRound(){
    console.log("nextRound thirteenjsx");
    let startingPlayerIdx = this.state.players.indexOf(
      this.state.currentPlayersInRound[0]
    );

    let newRoundRotation = this.state.players.slice(
      startingPlayerIdx,
      this.state.players.length).concat(this.state.players.slice(0, startingPlayerIdx));

    let firstPlayerIdx = this.rotation.indexOf(
      this.state.currentPlayersInRound[0]
    );

    let newRotation = this.rotation.slice(
      firstPlayerIdx,
      this.rotation.length).concat(this.rotation.slice(0, firstPlayerIdx));

    this.setState({
      currentPlayersInRound: newRoundRotation,
      bestCurrentPlay: this.resetBestCurrentPlay
    },
      this.nextMoveSameRound()
    );
  }

  nextMoveSameRound(){
    this.sleep(5000).then(() => {
      let currentPlayers = [].concat(this.state.currentPlayersInRound);
      let move = currentPlayers[0].makeMove(this.state.bestCurrentPlay);
      //IMPLEMENT MAKEMOVE FOR HUMAN AND CPU PLAYER
      //DON'T USE THIS MOVE
      if (move === "pass"){
        this.setState({ currentPlayersInRound: currentPlayers.slice(1, currentPlayers.length)},
          () => {
            //next round
            if(this.state.currentPlayersInRound.length > 1){
              return this.nextMoveSameRound();
            } else {
              return this.nextRound();
            }
          }
        );
      } else {
        console.log('nextplayer');
        currentPlayers.push(currentPlayers.shift());
        this.setState({ currentPlayersInRound: currentPlayers, bestCurrentPlay: move },
          this.nextMoveSameRound()
        );
        // this.setState({ bestCurrentPlay: move },
        //   () => {
        //     return this.nextPlayer();
        //   }
        // );
      }
    });
  }

  // nextPlayer(){
  //   console.log('next player');
  //   let currentPlayers = [].concat(this.state.currentPlayersInRound);
  //   currentPlayers.push(currentPlayers.shift());
  //   this.setState({ currentPlayersInRound: currentPlayers },
  //     this.nextMoveSameRound()
  //   );
  // }

  run(){
    this.nextMoveSameRound();
    // game loop
    // let firstMove = true;
    // while(this.state.players.length === 4){
      //round loop
      // while(this.state.currentPlayersInRound.length > 1){
      //
      // }
      // currentPlayersInRound has just 1 player, add on the rest of the players
      // let firstPlayerIdx = this.rotation.indexOf(this.state.currentPlayersInRound[0]);
      // let newRotation = this.rotation.slice(firstPlayerIdx, this.rotation.length).concat(this.rotation.slice(0, firstPlayerIdx));
      //
      // this.setState({
      //   currentPlayersInRound: newRotation,
      //   bestCurrentPlay: this.resetBestCurrentPlay
      // });

      // firstMove = false;
    // }
  }

  render(){
    let playedCardsOwner = (this.state.bestCurrentPlay.playerId) ? <p>{`Player ${this.state.bestCurrentPlay.playerId} played these cards!`}</p> : undefined;
    let playedCards = this.state.bestCurrentPlay.cards.sort((a, b) => (
      a.i - b.i
    )).map((card, idx) => {
      return(
        <HandCard
          offset={{"left":`calc(50vh + ${idx}*10px)`}}
          i={card.i}
          idx={idx}
          key={"card ".concat(card.i).concat(` ${idx}`)} />
      );}
    );

    let yourTurn = (this.state.currentPlayersInRound[0] === 0) ? <p>It's your turn!</p> : undefined;

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
            {yourTurn}
            {playedCardsOwner}
            {playedCards}
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
