// import interne

import { Card } from '../../Domaine/Entites/Card.js';
import { Cards } from '../../Domaine/Entites/Cards.js';
import { Category } from '../../Domaine/Entites/Category.js';
import { CardService } from '../../DomaineServices/CardService.js';
import { RevisionService } from '../../DomaineServices/RevisionService.js';
import { CardOrm } from '../BddAppllicationService/BddManager/CardORM.js';
// Initialisation
const cardOrm = new CardOrm();
let revisionService = new RevisionService();




// import node
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware : 
app.use(cors({ origin: 'http://localhost:8080' }));



// Route d'accueil
app.get('/', (req, res) => {
    res.send('Bonjour!');
  });
  // eespace test
  const MyRevisionService = new RevisionService();
  const cardService = new CardService();
  const card1 = cardService.createCard(1, 'Question 1', 'Réponse 1', 'Tag A');
  const card2 = cardService.createCard(2, 'Question 2', 'Réponse 2', 'Tag B');
  const card3 = cardService.createCard(3, 'Question 3', 'Réponse 3', 'Tag A');
  const cardsList = new Cards();
  cardService.addCardtoCards(cardsList, card1);
  cardService.addCardtoCards(cardsList, card2);
  cardService.addCardtoCards(cardsList, card3);
  MyRevisionService.CardValidate(card2);





// Cards
/**
 * TODO: remettre à jour la fonction ci dessous pour recuperer les données du fichier simulation
 *
 * @todo attendre le fichier de simulation de la part de chahine.
 * @param {Type} param1 Description du paramètre 1.
 * @param {Type} param2 Description du paramètre 2.
 * @returns {ReturnType} cardLists
 */

// cards 
app.get('/cards', async (req, res) => {
  console.log("Appel à /cards");
 
  const tags = req.query.tags;

  let cards = [];
  try {

      await cardOrm.init();
      if(tags){ cards=cardOrm.getCardsFiltredby(tags)}
      else  cards = cardOrm.getCards(); 
      res.json(cards); 
  } catch (error) {
      console.error('Erreur lors de la récupération des cartes: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }

  console.log("Fin de /cards");
});



  app.post('/cards', async(req, res) => {
    try {

      const tag = req.query.tag;
      const question = req.query.question;
      const answer = req.query.answer;
      console.log(question);

      const cardService = new CardService();
  

      let newCard = cardService.createCard( 22,question, answer, tag);
      // On ajoute la nouvelle carte dans la base de données
      await cardOrm.init();
      newCard =await cardOrm.addCard(newCard);
      console.log(newCard);
  
      res.json(newCard);
    } catch (error) {
      // En cas d'erreur, renvoyez une réponse d'erreur
      res.status(400).json({ error: 'Erreur lors de la création de la carte.' });
    }
  });


// QUIZZZZ

app.get('/cards/quizz', async(req, res)=>{
  try{
 await cardOrm.init();
  let cards = await revisionService.getTodaysRevisionCards( cardOrm.getCards());

  res.json(cards); 
}
catch(error){
  res.status(400).json({error:'Erreur lors du chargement'});
}

});





app.patch('/cards/:cardId/answer', async (req, res) => {
  try {
      const cardId = parseInt(req.params.cardId);
      const { answer } = req.body;

      const isCorrect = await revisionService.RepondreCard(cardId, answer);

      res.json({ isCorrect });
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
});


app.listen(8080, () => {
    console.log('Le serveur est démarré sur le port 8080.');
  });










/*
const cardManager = new CardManager();
const card1 = new Card(1, 'Question 1', 'Réponse 1', 'Tag A');
const card2 = new Card(2, 'Question 2', 'Réponse 2', 'Tag B');
const card3 = new Card(3, 'Question 3', 'Réponse 3', 'Tag A');

// Création de la liste de cartes et ajout des cartes
const cardsList = new Cards();
cardsList.addCard(card1);
console.log(`ID: ${card1.id}, Question: ${card1.question}, Catégorie: ${card1.category}`);
cardsList.addCard(card2);
cardsList.addCard(card3);

// Création du gestionnaire de révision et gestionnaire de sortie de révision
const revisionManager = new RevisionManager();
const revisionManagerOutput = new RevisionManagerOutput(); // Assurez-vous que le chemin est correct
/*
// Simuler la révision des cartes
revisionManager.CardValidate(card1);
revisionManager.CardValidate(card2);
revisionManager.CardValidate(card3);

// Obtenir les cartes à réviser aujourd'hui en utilisant le gestionnaire de sortie de révision
let cardsForToday = revisionManagerOutput.getTodaysRevisionCards(cardsList.cards); // Utilisez cardsList.cards pour accéder à la liste de cartes

// Afficher les cartes à réviser aujourd'hui
console.log('Cartes à réviser aujourd\'hui :');
for (const card of cardsForToday) {
    console.log(`ID: ${card.id}, Question: ${card.question}, Catégorie: ${card.category}`);
}
// Simuler la révision des cartes
revisionManager.CardValidate(card1);
console.log(`ID: ${card1.id}, Question: ${card1.question}, Catégorie: ${card1.category}, Date : ${card1.lastDateRevised}`);
revisionManager.CardValidate(card2);
console.log(`ID: ${card2.id}, Question: ${card2.question}, Catégorie: ${card2.category}, Date : ${card2.lastDateRevised}`);

//revisionManager.CardValidate(card3);

cardsForToday = revisionManagerOutput.getTodaysRevisionCards(cardsList.cards); 

// Afficher les cartes à réviser aujourd'hui
console.log('Cartes à réviser aujourd\'hui :');
for (const card of cardsForToday) {
    console.log(`ID: ${card.id}, Question: ${card.question}, Catégorie: ${card.category}`);
}*/