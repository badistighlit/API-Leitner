import { CardService } from './CardService.js'
import {Category} from '../Domaine/Entites/Category.js'
export class RevisionService{
    constructor() {
        this.cardService = new CardService();
    }
   

   /* PlanificateRevision(cardsList,heure){
    }*/
    
    CardValidate(card) {
        this.cardService.validationCard(card)
    }

    
    getTodaysRevisionCards(cardsList) { 
        let currentDate = new Date();
        let cardsForToday = [];
        cardsForToday= cardsList.filter(card => card.category == Category.CATEGORY_1);

        for(const card of cardsList){

            const timeDifference = currentDate - card.lastRevisedDate;
            const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
            switch (card.category) {
                case Category.CATEGORY_2 :if (daysDifference >= 2) {
                                              cardsForToday.push(card);
                                                       }   
                                               break;
                case Category.CATEGORY_3 :if (daysDifference >= 4) {
                                           cardsForToday.push(card);
                                                    }   
                                                 break;
                case Category.CATEGORY_4 :if (daysDifference >= 8) {
                                      cardsForToday.push(card);
                                                        }   
                                                break;    
                case Category.CATEGORY_5 :if (daysDifference >= 16) {
                                            cardsForToday.push(card);
                                                    }   
                                                break;
                case Category.CATEGORY_6 :  if (daysDifference >= 32) {
                                            cardsForToday.push(card);
                                                    }   
                                                break;
                case Category.CATEGORY_7 : if (daysDifference >= 64) {
                                            cardsForToday.push(card);
                                                    }   
                                                break;       
                                    }
        }
        this.setDate(cardsForToday);
        return cardsForToday;

        
    }

    setDate(cardsList){
        cardsList.forEach(card => {
        this.cardService.setLastRevisionDate(card);
            
        });


    }


}