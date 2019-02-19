import React from 'react';

function SpreadCards() {
  return (
    <div className={'card-container-splash'}>
      <div
        id="40"
        className={"card hearts rank2" + ' ' + 'spread'}
        style={{"left": "calc(40px)"}}
        >
        <div className="face"></div>
      </div>
      <div
        id="27"
        className={"card diamonds rank2" + ' ' + 'spread'}
        style={{"left": "calc(40px)"}}
        >
        <div className="face"></div>
      </div>
      <div
        id="14"
        className={"card clubs rank2" + ' ' + 'spread'}
        style={{"left": "calc(40px)"}}
        >
        <div className="face"></div>
      </div>
      <div
        id="1"
        className={"card spades rank2" + ' ' + 'spread'}
        style={{"left": "calc(40px)"}}
        >
        <div className="face"></div>
      </div>
    </div>
  )
}

export default SpreadCards;