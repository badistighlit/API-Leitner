import { Card } from '../../../Domaine/Entites/Card.js';
import { Cards } from '../../../Domaine/Entites/Cards.js';
import { lireFichier } from './readingDatabase.js';

export class CardOrm {

    constructor() {
        this.cards = new Cards();
    }

    async init() {
        try {
            const jsonData = await lireFichier();
            console.log(jsonData)
            jsonData.forEach(element => {
                let card = new Card(element.id, element.tags, element.question, element.reponse);
                this.addCardtoCards(card);
            });
        } catch (error) {
            console.error('Erreur lors de la lecture du fichier: ', error);
        }
    }

    addCardtoCards(card) {
        this.cards.addCard(card);
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
