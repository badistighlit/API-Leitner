import { Card } from '../Domaine/Entites/Card.js'
import { Category } from '../Domaine/Entites/Category.js';

export class CardService {
    createCard(id, question, reponse, tag) {
        let card = new Card(id, question, reponse,new Date(), tag, Category.CATEGORY_1)
        return card
    }
    createCardDetailled(id, question, reponse,date, tag, category){
        let card = new Card(id, question, reponse,new Date(date) ,tag,  Category[category]);
        return card;

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

    setLastRevisionDate(card){
        card.lastDateRevised=new Date();
    }
}