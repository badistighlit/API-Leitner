import { Card } from '../Domaine/Entites/Card.js'

export class CardService {
    createCard(id, question, reponse, tag) {
        let card = new Card(id, question, reponse,null, tag, 1)
        return card
    }
    addCardtoCards(cardsList, card) {
        cardsList.addCard(card);
    }
    validationCard(card) {
        card.categoryUp()
    }
    getCardById(cardsList, id) {
        return cardsList.find(card => card.id === id);
    }
    filterCardsByTag(cardsList, tag) {
        return cardsList.filter(card => card.tag === tag);
    }

    setLastRevisionDate(Card){
        this.Card.lastDateRevised=new Date();
    }
}