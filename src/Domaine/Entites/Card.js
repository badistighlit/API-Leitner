const { Category } = require("./Category");

class Card {
    constructor(id, question, reponse, tag, category) {
      this.id = id;
      this.question = question;
      this.reponse = reponse;
      this.tag = tag;
      this.lastDateRevised = null;
      
      this.category=category.CATEGORY_1
    }
    categoryUp(){
        
 
        if (this.category !== Category.CATEGORY_7) {
            this.lastDateRevised=new Date();
        this.category = this.category + 1;
        }
        else {
            //faire valider la carte ensuit
        }
    }
  }

  
module.exports = {Card};


