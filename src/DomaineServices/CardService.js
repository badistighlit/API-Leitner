import { Card } from '../Domaine/Entites/Card.js'
import { Category } from '../Domaine/Entites/Category.js';
import { CardOrm } from '../ApplicationServices/BddAppllicationService/BddManager/CardORM.js';

export class CardService {

    async createCard(id, question, reponse, tag) {
        this.cardOrm = new CardOrm();
        this.cardOrm.init();
        let card =await this.cardOrm.addCard(new Card(id, question, reponse,new Date(), tag, Category.FIRST));
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
        this.cardOrm = new CardOrm();
        card.categoryUp();
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