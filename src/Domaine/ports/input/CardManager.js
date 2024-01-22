import { Card } from '../../Entites/Card.js'

export class CardManager {
    createCard(id, question, reponse, tag) {
        let card = new Card(id, question, reponse, tag, 1)
        return card
    }
    addCardtoCards(cardsList, card) {
        cardsList.push(card);
    }
    validationCard(card) {
        card.categoryUp()
    }
}