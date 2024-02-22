import { CardService } from './CardService.js'
import {Category} from '../Domaine/Entites/Category.js'
import { CardOrm } from '../ApplicationServices/BddAppllicationService/BddManager/CardORM.js';
export class RevisionService{
    constructor() {
        this.cardService = new CardService();
        this.cardOrm = new CardOrm();
    }
   

   /* PlanificateRevision(cardsList,heure){
    }*/
    
    CardValidate(card) {
        this.cardService.validationCard(card)
    }
    CardInvalidate(card){
        this.cardService.invalidationCard(card);
    }
    async cardForcing(cardId){
        await this.cardOrm.init();
        console.log(cardId);
        const cardToForce = await this.cardOrm.getCardById(cardId);
        console.log(cardToForce);
        if (cardToForce === undefined) {
            throw new Error('Carte non trouvée');
        }
        
        this.CardValidate(cardToForce);
        
        return true;

    }
    async RepondreCard(cardId, answer) {
        await this.cardOrm.init();
        const card = await this.cardOrm.getCardById(cardId);
        console.log(card);
        if (card === undefined) {
            throw new Error('Carte non trouvée');
        }
        
        const isCorrect= (answer === card.answer);
        if(isCorrect){this.CardValidate(card);}
        else {this.CardInvalidate(card);}
        return isCorrect;
    }
    convertirStringEnDate(chaineDate) {
        
        const [jour, mois, annee] = chaineDate.split('-');
        const date = new Date(`${annee}-${mois.padStart(2, '0')}-${jour.padStart(2, '0')}T00:00:00.000Z`);
        console.log(date);
        return date;
      }
      
    getTodaysRevisionCards(cardsToFilter) {
        let DateRevision = new Date()
       /* if(date) DateRevision = this.convertirStringEnDate(date);
        console.log(DateRevision);*/
        let cardsForToday = [];
        cardsForToday= cardsToFilter.filter(card => card.category == Category.FIRST);
        
        for(const card of cardsToFilter){
            console.log("1------------------------:");
            

            const timeDifference = DateRevision - card.lastDateRevised;


            const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
            console.log(daysDifference);
            console.log(card.category);
            console.log(card.id);
            console.log("fin------------------------:");
            switch (card.category) {
                case Category.SECOND :if (daysDifference >= 2) {
                                              cardsForToday.push(card);
                                                       }   
                                               break;
                case Category.THIRD :if (daysDifference >= 4) {
                                           cardsForToday.push(card);
                                                    }   
                                                 break;
                case Category.FOURTH :if (daysDifference >= 8) {
                                      cardsForToday.push(card);
                                                        }   
                                                break;    
                case Category.FIFTH :if (daysDifference >= 16) {
                                            cardsForToday.push(card);
                                                    }   
                                                break;
                case Category.SIXTH :  if (daysDifference >= 32) {
                                            cardsForToday.push(card);
                                                    }   
                                                break;
                case Category.SEVENTH : if (daysDifference >= 64) {
                                            cardsForToday.push(card);
                                                    }   
                                                break;       
                                    }
                                    
        }

       // this.setDate(cardsForToday);

        return cardsForToday;

        
    }

    setDate(cardsList){
        
        cardsList.forEach(card => {
        this.cardService.setLastRevisionDate(card);
        console.log(card);
        });
     


    }




}