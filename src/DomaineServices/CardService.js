import { Card } from '../Domaine/Entites/Card.js'
import { Category } from '../Domaine/Entites/Category.js';
import { CardOrm } from '../ApplicationServices/BddAppllicationService/BddManager/CardORM.js';

export class CardService {

    async createCard(id, question, answer, tag) {
        this.cardOrm = new CardOrm();
        this.cardOrm.init();
        let card = new  Card(id, question, answer,new Date(), tag, Category.FIRST)
         card =await this.cardOrm.addCard(card);
        return card
    }
    createCardDetailled(id, question, answer,date, tag, category){

        let card = new Card(id, question, answer,new Date(date) ,tag,  Category[category]);
        return card;

    }
    addCardtoCards(cardsList, card) {
        cardsList.addCard(card);
    }
    validationCard(card) {
        this.cardOrm = new CardOrm();
        card.categoryUp();
        this.cardOrm.editCard(card);
    }
    invalidationCard(card){
        this.cardOrm = new CardOrm();
        card.categoryDown();
        this.cardOrm.editCard(card);
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