
import { Category } from './Category.js'

 export class Card {
    constructor(id, question, reponse,lastDateRevised, tag, category) {
      this.id = id;
      this.question = question;
      this.reponse = reponse;
      this.tag = tag;
      this.lastDateRevised = lastDateRevised;
      
      this.category=category;
    }

    secondConstructor(){

    }

     categoryUp(){
        
 
        if (this.category !== Category.SEVENTH) {
            this.lastDateRevised=new Date();
            switch (this.category) {
              case Category.FIRST:
                this.category = Category.SECOND;
                break;
              case Category.SECOND:
                console.log("avant ");
                console.log(this.category);
                this.category = Category.THIRD;
                console.log("apres ");
                console.log(this.category);
                break;
              case Category.THIRD:
                this.category = Category.FOURTH;
                break;
              case Category.FOURTH:
                this.category = Category.FIFTH;
                break;
              case Category.FIFTH:
                this.category = Category.SIXTH;
                break;
              case Category.SIXTH:
                this.category = Category.SEVENTH;
                break;}
        }
        else {
            //faire valider la carte ensuit
        }
    }
  }

  



