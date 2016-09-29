import React from 'react';
import HistoryItem from './history_item';

class History extends React.Component {
  constructor(props){
    super(props);
    this.currentPlay = this.props.currentPlay;
    this.log = [];
  }

  componentWillReceiveProps(nextProps){
    if ((nextProps.currentPlay.kicker.kickerRank !== this.currentPlay.kicker.kickerRank)) {
      this.currentPlay = nextProps.currentPlay;
      this.log.unshift(<HistoryItem key={'history item '.concat(this.log.length).concat(nextProps.currentPlay.kicker.kickerRank)} play={nextProps.currentPlay} />);
    }
  }

  render(){
    return(
      <ul className="play-history">
        {this.log}
      </ul>
    );
  }
}

export default History;
