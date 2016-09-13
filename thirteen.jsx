import React from 'react';
import ReactDOM from 'react-dom';

class PlayingFieldComponent extends React.Component {
  render() {
    return(
      <section className="playing-field">
        <div className="CPU player top">
          <div className="top-hand">
            <div className="card spades rank1">
              <div className="face"></div>
            </div>
          </div>

          <div className="top-played-cards">
          </div>
        </div>

        <div className="CPU left-right">
          <div className="CPU player left">
            <div className="left-hand"></div>
            <div className="left-played-cards"></div>
          </div>
          <div className="CPU player right">
            <div className="right-hand"></div>
            <div className="right-played-cards"></div>
          </div>
        </div>

        <div className="human player bottom">
          <div className="bottom-hand"></div>
          <div className="bottom-played-cards"></div>
        </div>
      </section>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<PlayingFieldComponent/>, document.getElementById('root'));
});
