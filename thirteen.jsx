import React from 'react';
import ReactDOM from 'react-dom';
import Player from './player';

class PlayingFieldComponent extends React.Component {
  render() {
    return(
      <section className="playing-field">
        <Player player="CPU player top" hand={[0,1,12,15,51]}/>
      </section>
    );
  }
}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<PlayingFieldComponent/>, document.getElementById('root'));
});
