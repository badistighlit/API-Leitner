import { CardManager } from "./CardManager.js";
export class RevisionManager{
    constructor() {
        this.cardManager = new CardManager();
    }
   

    PlanificateRevision(cardsList,heure){
    }
    
    CardValidate(card) {
        this.cardManager.validationCard(card)
    }



}