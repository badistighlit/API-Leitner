import assert from 'assert';
import axios from 'axios';
import { expect } from 'chai';


const api = 'http://localhost:8080';
// test get cards
async function testGetCards() {
  try {
    const response = await axios.get(`${api}/cards`);
    assert.strictEqual(response.status, 200);
    assert.ok(response.data);
    console.log('Test "getcards" :succés.');
  } catch (error) {
    console.error('Test "getcards" :FAIL.!! /|', error.message);
  }
}

// test create card

async function testCreateCard() {
  try {
    const cardUser = {
      tag: 'CARTE DE TEST',
      question: 'question?',
      answer: 'réponse',
    };
    const response = await axios.post(`${api}/cards`, cardUser);
    assert.strictEqual(response.status, 200);
    assert.ok(response.data);
    console.log('Test "create card" :succés.');
  } catch (error) {
    console.error('Test "create card" :FAIL.!! /|', error.message);
  }
}


// test réponse
async function testAnswerCorrectToCard(){
  try{
    const cardId = 1; 
    const body = { isValid: true };

    let response=await axios.patch(`${api}/cards/${cardId}/answer`,body);
    expect(response.status).to.equal(204);
    expect(response.data).to.be.empty;

    console.log('Test "answer correct to card" :succés.');
  }
  catch(error){
    console.error('Test "answer correct to card" :FAIL. !! /| ', error.message);

  }

}


async function testAnswerFalseToCard(){
  try{
    const cardId = 1; 
    const body = { isValid: false };

    let response=await axios.patch(`${api}/cards/${cardId}/answer`,body);
    console.log('Test "answer false to card" : FAILEDDDD ')
  }
  catch(error){
    if(error.message=='Request failed with status code 400'){
    console.log('Test "answer false to card" :sucess . ', error.message);}
    else console.error('Test "answer false to card" : FAIL !!! ', error.message);


  }
}

async function testAnswerToInexistentCard(){
  try{
    const cardId = 999999999999; 
    const body = { isValid: false };

    let response=await axios.patch(`${api}/cards/${cardId}/answer`,body);


    console.log('Test "answer false to card" :failed !!!!!!.');
  }
  catch(error){
    if(error.message=='Request failed with status code 404'){
    console.error('Test "answer  to inexistant card" :sucess  ', error.message);}
    else console.error('Test "answer  to inexistant card" :FAILED . !! /| ', error.message);}

  }




(async () => {
  await testGetCards();
  await testCreateCard();
  await testAnswerCorrectToCard();
  await testAnswerFalseToCard();
  await testAnswerToInexistentCard();


})();