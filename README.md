## Readme - API de Cartes de Révision
# Introduction
Bienvenue sur l'API de Cartes de Révision! Cette API permet de gérer des cartes d'apprentissage, de les filtrer, de les créer, de les réviser, et bien plus encore. Elle est développée en utilisant Node.js et Express.

# Prérequis
Assurez-vous d'avoir Node.js et npm installés sur votre machine avant de démarrer l'API.

# Installation
Clonez le dépôt sur votre machine locale.
Accédez au répertoire du projet.
Exécutez la commande suivante pour installer les dépendances :

npm install

# Configuration
L'API utilise le port 8080 par défaut. Assurez-vous que ce port est disponible sur votre machine. Si vous souhaitez utiliser un autre port, modifiez la ligne suivante dans le fichier server.js :


app.listen(8080, () => {
    console.log('Le serveur est démarré sur le port 8080.');
});
# Lancement de l'API
Pour lancer l'API, exécutez la commande suivante dans le terminal, depuis le répertoire du projet :


npm start

L'API sera accessible à l'adresse http://localhost:8080.

## Endpoints

#Accueil
GET / : Affiche un message de bienvenue.

#Cartes
GET /cards : Récupère la liste des cartes. Les filtres peuvent être appliqués en utilisant les paramètres de requête, par exemple, /cards?tags=tag1,tag2.

POST /cards : Crée une nouvelle carte en spécifiant le tag, la question et la réponse dans le corps de la requête au format JSON.

#Quizz
GET /cards/quizz : Récupère les cartes pour le quiz du jour. Les cartes révisées sont basées sur la date fournie en paramètre, par exemple, /cards/quizz?date=2024-02-26.

Réponses aux Cartes

PATCH /cards/:cardId/answer : Met à jour la réponse à une carte spécifique. Le corps de la requête doit contenir un champ isValid pour indiquer si la réponse est correcte.


POST /cards/:cardId/answer/force : Force la révision d'une carte spécifique.




Auteur
<TIGHLIT Badis>
<MEHADJI Chahine>

Merci d'utiliser notre API de Cartes de Révision!
