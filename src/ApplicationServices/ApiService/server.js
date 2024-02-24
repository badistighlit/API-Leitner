// import interne
import { CardService } from '../../DomaineServices/CardService.js';
import { RevisionService } from '../../DomaineServices/RevisionService.js';
import { CardOrm } from '../BddAppllicationService/BddManager/CardORM.js';

// import node
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Initialisation
const cardOrm = new CardOrm();
let revisionService = new RevisionService();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware : 
//app.use(cors({ origin: 'http://localhost:8080' }));



// Route d'accueil
app.get('/', (req, res) => {
    res.send('Bonjour!');
  });
  // eespace test

// cards 
app.get('/cards', async (req, res) => {

 
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


});



  app.post('/cards', async(req, res) => {
    try {

      const tag = req.body.tag;
      const question = req.body.question;
      const answer = req.body.answer;

      const cardService = new CardService();
  

      let newCard = await cardService.createCard( 22,question, answer, tag);
      
  
      res.json(newCard);
    } catch (error) {
      res.status(400).json({ error: 'Erreur lors de la création de la carte.' });
    }
  });



// QUIZZZZ

app.get('/cards/quizz', async(req, res)=>{
  try{
    await cardOrm.init();
    let cards =[]
  const date = req.query.date;
  if(date) {console.log("OK ON CHERCHE UNE DATE "+date);
           cards= await revisionService.getTodaysRevisionCards( cardOrm.getCards(),revisionService.convertirStringToDate(date));}
            else{cards =await revisionService.getTodaysRevisionCards( cardOrm.getCards(),new Date()) }

  

  

  res.json(cards); 
}
catch(error){
  res.status(400).json({error:'Erreur lors du chargement'});
}

});


app.post('/cards/:cardId/answer/force', async (req, res) => {
  try{  

    const cardId = parseInt(req.params.cardId);
     await revisionService.cardForcing(cardId);
     res.json("sucess");

  }
  catch(error){res.status(400).json({error:'Erreur lors du forcing'})}
})


app.patch('/cards/:cardId/answer', async (req, res) => {
  try {
    const cardId = parseInt(req.params.cardId);
    await cardOrm.init();
    
  
    if (!cardOrm.getCardById(cardId)) {
      return res.status(404).json({ error: "Card not found" });
    }
    

    let { isValid } = req.body;
    await revisionService.RepondreCard(cardId, isValid);
    if (isValid===true) {
      console.log("réponse correct prise en compte");
      return res.status(204).json("Answer has been taken into account"); // body vide
    } else {
      console.log("réponse fausse prise en compte");
      return res.status(400).json({ error: "Bad request" });
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

app.listen(8080, () => {
    console.log('Le serveur est démarré sur le port 8080.');
  });

