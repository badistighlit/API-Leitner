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
    getCardById(cardsList, id) {
        return cardsList.find(card => card.id === id);
    }
    filterCardsByTag(cardsList, tag) {
        return cardsList.filter(card => card.tag === tag);
    }
    


}


module.exports = {CardManager};
