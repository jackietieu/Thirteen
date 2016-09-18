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

    // this.player0 = new HumanPlayerObj(this.shuffledDeck.slice(0, 13).sort());
    this.player0 = new ComputerPlayerObj(0, this.shuffledDeck.slice(0, 13));
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

  // waitForPlayerMove(){
  //   this.sleep(500).then(() => {
  //     // console.log('waiting');
  //   let move = this.state.currentPlayersInRound[0].makeMove(this.state.bestCurrentPlay);
  //     if (move === undefined) {
  //       return this.waitForPlayerMove();
  //     } else {
  //       // console.log('returning move', move);
  //       this.state.currentPlayersInRound[0].kickout = false;
  //       this.state.currentPlayersInRound[0].pass = false;
  //       this.state.currentPlayersInRound[0].selectedHand = undefined;
  //       this.playedCards = undefined;
  //       return move;
  //     }
  //   });
  // }

  nextMoveSameRound(){
    this.sleep(100).then(() => {
      // console.log('nextmove');
      let currentPlayers = [].concat(this.state.currentPlayersInRound);
      let move = currentPlayers[0].makeMove(this.state.bestCurrentPlay);

      // if (humanMove) {
      //   move = humanMove;
      // } else {
      //   move = currentPlayers[0].makeMove(this.state.bestCurrentPlay);
      // }
      //
      // if ((currentPlayers[0] === this.player0) && (move === undefined)) {
      //   move = this.waitForPlayerMove();
      //   debugger;
      //   this.nextMoveSameRound(move);
      // }

      // console.log(currentPlayers);
      // console.log(move);
      //IF STAFEMENT
      //IF CURRENTPLAYERS[0] === THIS.PLAYER[0]
      //SET MOVE = UNDEFINED
      //USE SLEEP TIMER
      //CALL HUMANPLAYEROBJ MAKEMOVE
      //IF MAKEMOVE RETURNS UNDEFINED, RETURN MAKEMOVE AGAIN AND REDEFINE
      //ELSE IF MAKEMOVE RETURNS PASS, PASS TO NEXT PLAYER
      //ELSE IF MAKEMOVE RETURNS WITH AN OBJ, PLAY THE CARDS AND GO TO NEXTPLAYER
      //ELSE, RUN THE REST OF THE CODE IN AN ELSE BLOCK FOR CPUS

      //IMPLEMENT MAKEMOVE FOR HUMAN AND CPU PLAYER
      //DON'T USE THIS MOVE
      // if (move !== undefined) {
        if (move === "pass"){
          // console.log("pass");
          // console.log(currentPlayers.slice(1, currentPlayers.length));
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
      // } else {
        // console.log('nextplayer');
        // console.log(move);
        // if (move === undefined) {
        //   //need to wait for human player to move
        //   //this is for humanplayer logic
        //   this.sleep(1000).then(() => {
        //     // console.log('human player logic check in sleep loop');
        //     // return move;
        //     // return this.nextMoveSameRound();
        //     if (move !== undefined) {
        //       //move has been made
        //       // console.log('move made');
        //       if (move === "pass") {
        //         this.setState({ currentPlayersInRound: currentPlayers.slice(1, currentPlayers.length)},
        //         () => {
        //           // console.log('pass');
        //           //next play or round
        //           if(this.state.currentPlayersInRound.length > 1){
        //             return this.nextMoveSameRound();
        //           } else {
        //             return this.nextRound();
        //           }
        //         }
        //       );
        //     } else {
        //       //move has been made, go to next player
        //       // console.log('move has been made');
        //       currentPlayers.push(currentPlayers.shift());
        //       this.setState({ currentPlayersInRound: currentPlayers, bestCurrentPlay: move },
        //         this.nextMoveSameRound()
        //       );
        //     }
        //   }
        // });
      } else {
        //if someone won
        //run through rest of logic for AI
        let possibleWinner = currentPlayers[0];
        currentPlayers.push(currentPlayers.shift());
        this.setState({ currentPlayersInRound: currentPlayers, bestCurrentPlay: move }, () => {
          if (possibleWinner.hand.cards.length === 0) {
            alert(`Player ${possibleWinner.id} won!`);
            return;
          }

          this.nextMoveSameRound();
        }
        );

      }

      // this.setState({ bestCurrentPlay: move },
      //   () => {
      //     return this.nextPlayer();
      //   }
      // );
    // }}
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
    let playedCardsOwner = ((this.state.bestCurrentPlay.playerId) || (this.state.bestCurrentPlay.playerId === 0)) ? <p>{`Player ${this.state.bestCurrentPlay.playerId} played this!`}</p> : undefined;
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

    // let yourTurn = (this.state.currentPlayersInRound[0] === 0) ? <p>It's your turn!</p> : undefined;

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
            {playedCardsOwner}
            {playedCards}
          </div>
          <ComputerPlayer
            playerId={3}
            playerObj={this.state.players[3]} />
        </div>

        <ComputerPlayer
          playerId={0}
          playerObj={this.state.players[0]} />
      </section>
    );
  }
}

// <HumanPlayer
//   playerId={0}
//   playerObj={this.state.players[0]}
//   currentPlayToBeat={this.state.bestCurrentPlay}
//   nextMoveSameRound={this.nextMoveSameRound.bind(this)} />

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<PlayingFieldComponent />, document.getElementById('root'));
});
