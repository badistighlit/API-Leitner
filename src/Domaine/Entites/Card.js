
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
        
 
        if (this.category !== Category.CATEGORY_7) {
            this.lastDateRevised=new Date();
            switch (this.category) {
              case Category.CATEGORY_1:
                this.category = Category.CATEGORY_2;
                break;
              case Category.CATEGORY_2:
                this.category = Category.CATEGORY_3;
                break;
              case Category.CATEGORY_3:
                this.category = Category.CATEGORY_4;
                break;
              case Category.CATEGORY_4:
                this.category = Category.CATEGORY_5;
                break;
              case Category.CATEGORY_5:
                this.category = Category.CATEGORY_6;
                break;
              case Category.CATEGORY_6:
                this.category = Category.CATEGORY_7;
                break;}
        }
        else {
            //faire valider la carte ensuit
        }
    }
  }

  



