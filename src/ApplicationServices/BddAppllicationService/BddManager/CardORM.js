import { Card } from '../../../Domaine/Entites/Card.js';
import { Cards } from '../../../Domaine/Entites/Cards.js';
import { lireFichier } from './readingDatabase.js';
import { ajouterCarte, modifierCarte } from './writingDatabase.js';
import { CardService } from '../../../DomaineServices/CardService.js';

export class CardOrm {

    constructor() {
        this.cards = new Cards();
        this.cardService = new CardService();
    }

    async init() {
        try {
            this.cards=new Cards();
            const jsonData = await lireFichier();

            jsonData.forEach(element => {

                //id, question, reponse,lastDateRevised, tag, category
                let card = this.cardService.createCardDetailled( element.id, element.question, element.answer, element.lastDateRevised,element.tag,element.category);
                this.addCardtoCards(card);

            });
        } catch (error) {
            console.error('Erreur lors de la lecture du fichier: ', error);
        }
    }

    addCardtoCards(card) {
        this.cards.addCard(card);
    }
     getCards(){
        

        return this.cards.cards;
    }

    getCardsFiltredby(tags) {

    

    
        return this.cards.cards.filter(card => tags.includes(card.tag));
    

    }
    async getCardById(id){

        console.log("ID recherché :", id);
       return this.cards.cards.find(card => card.id === id);
    }

    async addCard(card) {
        await this.init();

        const lastCard = this.cards.cards.length > 0 ? this.cards.cards.slice(-1)[0] : { id: 0 };
        card.id = lastCard.id + 1;
        await ajouterCarte(card);
        this.addCardtoCards(card); 
        return card;
    }

    afficherCartes() {

        this.cards.cards.forEach(card => {

            
            console.log(`ID: ${card.id}, tags: ${card.tags}, question: ${card.question}, answer: ${card.answer}`);
        });
    }

    editCard(card){
        modifierCarte(card);
    }
    deleteCard(card){
        supprimerCarte(card);
    }

}

