import { CardService } from './CardService.js'
import {Category} from '../Domaine/Entites/Category.js'
import { CardOrm } from '../ApplicationServices/BddAppllicationService/BddManager/CardORM.js';
export class RevisionService{

    constructor() {
        this.cardService = new CardService();
        this.cardOrm = new CardOrm();
    }
    
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
    async RepondreCard(cardId, isCorrect) {
        await this.cardOrm.init();
        const card = await this.cardOrm.getCardById(cardId);
        if(isCorrect){this.CardValidate(card);}
        else {this.CardInvalidate(card);}
        return isCorrect;
    }


    getTodaysRevisionCards(cardsToFilter,date) {
        console.log(date);
       

        let DateRevision= date;
        console.log("date revision  "+DateRevision)
        let cardsForToday = [];
       // cardsForToday= cardsToFilter.filter(card => card.category == Category.FIRST);
        
        for(const card of cardsToFilter){

            

            const timeDifference = DateRevision - card.lastDateRevised;
            console.log(timeDifference.toString());

            const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
            console.log(daysDifference.toString());
            if(daysDifference<0) break;

            switch (card.category) {
                case Category.FIRST : cardsForToday.push(card); 
                                        break;
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
        return cardsForToday;  
    }

    setDate(cardsList){
        
        cardsList.forEach(card => {
        this.cardService.setLastRevisionDate(card);

        });
    }



    convertirStringToDate(chaineDate) {
        
        const [annee, mois, jour] = chaineDate.split('-');
        const date = new Date(`${annee},${mois},${jour}`);
        return date;
      }

}