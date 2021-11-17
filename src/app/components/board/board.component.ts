import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interfaca';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  cardImages = [
    'pDGNBK9A0sk',
    'fYDrhbVlV1E',
    'qoXgaF27zBc',
    'b9drVB7xIOI',
  ];
  cards: Card[] = [];
  flippedCards: Card[] = [];
  matchedCount = 0;
  constructor() { }

  ngOnInit(): void {
    this.setupCards();
  }

  setupCards(): void {
      this.cards = [];
      this.cardImages.forEach((image) => {
        const cardData: Card = {
          imageId: image,
          state: 'default'
        };
        this.cards.push({ ...cardData });
        this.cards.push({ ...cardData });
      });
      this.cards = this.shuffleArray(this.cards);
  }

  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }
  cardClicked(index: number): void {
    const cardInfo = this.cards[index];
    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);
      if (this.flippedCards.length > 1) {
        this.checkForCardMatch();
      }
    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();
    }

  }

  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;
        cardOne.state = cardTwo.state = 'default'
        if (this.matchedCount === this.cardImages.length) {
          alert('Congratulations!')
          setTimeout(() => {
            this.restart()
          }, 500);
        }
       }
    }, 1000);
  }

  restart():void {
    this.matchedCount = 0;
    this.setupCards();
  }

}
