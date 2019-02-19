import React from 'react';
import HistoryItem from './history_item';

class History extends React.Component {
  constructor(props){
    super(props);
    this.currentPlay = this.props.currentPlay;
    this.currentPlayers = this.props.currentPlayers;
    this.currentPlayerIds = this.currentPlayers.map(player => (
      player.id
    ));
    this.log = [];
    this.pass = [];
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.currentPlay.type === "newRound") {
      this.pass = [];
      this.log.unshift(<span key={'newRound '.concat(this.log.length).concat(nextProps.currentPlay.kicker.kickerRank)} className="log-item">New Round!</span>);
    } else if ((nextProps.currentPlay.kicker.kickerRank !== this.currentPlay.kicker.kickerRank)) {
      this.currentPlay = nextProps.currentPlay;

      this.log.unshift(
        <HistoryItem
          key={'history item '.concat(this.log.length).concat(nextProps.currentPlay.kicker.kickerRank)}
          play={nextProps.currentPlay} />
      );
    } else {
      this.currentPlay = nextProps.currentPlay;
      this.currentPlayers = nextProps.currentPlayers;
      this.currentPlayerIds = this.currentPlayers.map(player => (
        player.id
      ));

      for (let i = 0; i < 4; i++) {
        if ((this.pass.indexOf(i) === -1) && (this.currentPlayerIds.indexOf(i) === -1)) {
          this.pass.push(i);
          if (i === 0) {
            this.log.unshift(<span key={'pass '.concat(this.log.length).concat(nextProps.currentPlay.kicker.kickerRank)} className="log-item">You passed!</span>);
          } else {
            this.log.unshift(<span key={'pass '.concat(this.log.length).concat(nextProps.currentPlay.kicker.kickerRank)} className="log-item">Player {i} passed!</span>);
          }
          break;
        }
      }
    }
  }

  render(){
    return(
      <ul className="play-history">
        <li className="history-recent-header">Most Recent:</li>
        {this.log}
      </ul>
    );
  }
}

export default History;
