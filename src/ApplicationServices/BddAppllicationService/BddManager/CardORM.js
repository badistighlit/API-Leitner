import { Card } from '../../../Domaine/Entites/Card.js';
import { Cards } from '../../../Domaine/Entites/Cards.js';
import { lireFichier } from './readingDatabase.js';
import { ajouterCarte } from './writingDatabase.js';

export class CardOrm {

    constructor() {
        this.cards = new Cards();
    }

    async init() {
        try {
            const jsonData = await lireFichier();
            console.log(jsonData)
            jsonData.forEach(element => {//id, question, reponse,lastDateRevised, tag, category
                let card = new Card(element.id, element.question, element.reponse, element.lastDateRevised,element.tags,element.category);
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
        console.log(tags);
    

    
        return this.cards.cards.filter(card => card.tag===tags);
    

    }

    async addCard(card) {
        const lastCard = this.cards.cards.length > 0 ? this.cards.cards.slice(-1)[0] : { id: 0 };
        card.id = lastCard.id + 1;
        await ajouterCarte(card);
        return card;
    }

    afficherCartes() {
        console.log("Liste des cartes :");
        this.cards.cards.forEach(card => {

            
            console.log(`ID: ${card.id}, tags: ${card.tags}, question: ${card.question}, reponse: ${card.reponse}`);
        });
    }
}

(async () => {
    const cardOrm = new CardOrm();
    await cardOrm.init();
    cardOrm.afficherCartes();
})();
