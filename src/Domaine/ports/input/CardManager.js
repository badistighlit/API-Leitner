const { Card } = require('../Entites/Card');


class CardManager{
    createCard(id, question, reponse, tag){
        let card = new Card(id, question, reponse, tag, 1)

    }
    addCardtoCards(cardsList,card) {
        cardsList.push(card);
        
    }
    validationCard(card){
        card.categoryUp();
    }
   
    


}


module.exports = {CardManager};
