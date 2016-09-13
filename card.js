class Card {
  constructor (i) {
    //cards labeled from 1 - 52
    this.rank = i % 13 + 1;
    this.suit = i / 13 | 0;
    this.z = (52 - i) / 4;
  }

  $el () {
    return document.createElement('div');
  }

  $face () {
    return document.createElement('div');
  }

  $back () {
    return document.createElement('div');
  }

  $face.classList.add('face');
  $back.classList.add('back');
}
