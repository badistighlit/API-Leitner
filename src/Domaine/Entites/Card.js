
import { Category } from './Category.js'

 export class Card {
    constructor(id, question, answer,lastDateRevised, tag, category) {
      this.id = id;
      this.question = question;
      this.answer = answer;
      this.tag = tag;
      this.lastDateRevised = lastDateRevised;
      
      this.category=category;
    }

    secondConstructor(){

    }
    categoryDown(){this.category=Category.FIRST}

     categoryUp(){
        
 
        if (this.category !== Category.SEVENTH) {
            this.lastDateRevised=new Date();
            switch (this.category) {
              case Category.FIRST:
                this.category = Category.SECOND;
                break;
              case Category.SECOND:
                
                
                this.category = Category.THIRD;
                
              
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
          this.category = Category.DONE;
        }
    }
  }

  



