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

