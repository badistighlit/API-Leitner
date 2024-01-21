const { CardManager } = require('./Domaine/ports/input/CardManager.js');
const { RevisionManager } = require('./Domaine/ports/input/RevisionManager.js');
const { RevisionManagerOutput } = require('./Domaine/ports/output/RevisionManagerOutput.js');
const { Cards } = require('Domaine/Entites/Cards.js');
const { Card } = require('Domaine/Entites/Card');
const { Category } = require('./Domaine/Entites/Category.js');

// Création de quelques cartes
const cardManager = new CardManager();
const card1 = new Card(1, 'Question 1', 'Réponse 1', 'Tag A');
const card2 = new Card(2, 'Question 2', 'Réponse 2', 'Tag B');
const card3 = new Card(3, 'Question 3', 'Réponse 3', 'Tag A');

// Création de la liste de cartes et ajout des cartes
const cardsList = new Cards();
cardsList.addCard(card1);
cardsList.addCard(card2);
cardsList.addCard(card3);

// Création du gestionnaire de révision et gestionnaire de sortie de révision
const revisionManager = new RevisionManager();
const revisionManagerOutput = new RevisionManagerOutput(); // Assurez-vous que le chemin est correct

// Simuler la révision des cartes
revisionManager.CardValidate(card1);
revisionManager.CardValidate(card2);
revisionManager.CardValidate(card3);

// Obtenir les cartes à réviser aujourd'hui en utilisant le gestionnaire de sortie de révision
const cardsForToday = revisionManagerOutput.getTodaysRevisionCards(cardsList.cards); // Utilisez cardsList.cards pour accéder à la liste de cartes

// Afficher les cartes à réviser aujourd'hui
console.log('Cartes à réviser aujourd\'hui :');
for (const card of cardsForToday) {
    console.log(`ID: ${card.id}, Question: ${card.question}, Catégorie: ${card.category}`);
}
