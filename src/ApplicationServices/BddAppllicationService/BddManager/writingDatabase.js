import { access, readFile, writeFile } from 'fs/promises';
import fs from 'fs';



//const cheminFichier = 'src/database.json'
//const cheminFichier = '../../../database.json'
const cheminFichier = 'ProjetCards/Back/clean-code-esgi-project-back/src/database.json'

async function loadData() {
    const contenuFichier = await readFile(cheminFichier, "utf8");
    return JSON.parse(contenuFichier);
}

async function vérifierFichierExiste() {
    try {
        console.log(cheminFichier);
        await access(cheminFichier);
        console.log('Le fichier existe');
        return true;
    } catch (erreur) {
        console.log(erreur);
        console.log('Le fichier n\'existe pas !');
        return false;
    }
}

async function verifierContenueFichierCrochet(jsonData) {
    if (jsonData.trim() === '[]') {
        console.log('Le fichier a été vidé car il ne contenait que des crochets vides.');
        return true
    }
    else {
        return false
    }
}


function vérificationObjet(objet) {
    if (!objet.id || !objet.tag || !objet.question || !objet.reponse || !objet.category || !objet.lastDateRevised) {
        console.log(objet.id);
        console.log(objet.tag);
        console.log(objet.question);
        console.log(objet.reponse);
        console.log(objet.category);
        console.log(objet.lastDateRevised);

        console.log("L'objet doit contenir un identifiant numérique, une question, une réponse et une catégorie.");
        return false;
    }
    else return true;
}

async function writeFileWhenDontHaveAccolade(cheminFichier, contenuAEcrire) {
    await writeFile(cheminFichier, '[' + contenuAEcrire + '\n]');
    console.log('Le contenu a été ajouté dans le fichier vide avec succès.');
}

async function writeFileWhenHaveAccolade(cheminFichier, contenuAEcrire, contenuActuel, dernierAccoladeIndex) {
    const contenuMisAJour = [
        contenuActuel.slice(0, dernierAccoladeIndex + 1),
        ",",
        contenuAEcrire,
        contenuActuel.slice(dernierAccoladeIndex + 1)
        ].join('');
        
        await writeFile(cheminFichier, contenuMisAJour);
        console.log('Le contenu a été ajouté dans le fichier avec succès.');
}

async function verifierSiFichierVide(contenuActuel) {
    return contenuActuel.trim() === '';
}

async function ajouterCarte(objet) {

    const contenuAEcrire = '\n    ' + JSON.stringify(objet);

    if(vérificationObjet(objet)) {
        if(await vérifierFichierExiste()){
            try {
                let contenuActuel = await readFile(cheminFichier, 'utf-8');
                const dernierAccoladeIndex = contenuActuel.lastIndexOf('}');

                if (await verifierContenueFichierCrochet(contenuActuel)) {
                    try {
                        await writeFile(cheminFichier, ''); // Écrire une chaîne vide dans le fichier pour le vider complètement
                        contenuActuel = await readFile(cheminFichier, 'utf-8');
                    } catch (erreur) { 
                        console.error("Erreur lors de la vérification du contenu du fichier :", erreur);
                    }
                }

                if (await verifierSiFichierVide(contenuActuel)) {
                    writeFileWhenDontHaveAccolade(cheminFichier, contenuAEcrire)
                }
                else if (dernierAccoladeIndex !== -1) {
                    writeFileWhenHaveAccolade(cheminFichier, contenuAEcrire, contenuActuel, dernierAccoladeIndex)

                } else {
                    console.error('Le fichier JSON n\'a pas de caractère \'}\'.');
                }
            } catch (erreur) {
                console.error('Une erreur s\'est produite lors de l\'ajout dans le fichier :', erreur);
            }
        }
    }
}

async function modifierCarte(nouveauObjet) {
    if (await vérifierFichierExiste()) {
        try {
            let jsonData = await loadData();
            let index = jsonData.findIndex((obj) => obj.id === nouveauObjet.id);
            if (index !== -1) {
                // Remplacer l'objet existant par le nouveau
                jsonData[index] = nouveauObjet;
                await writeFile(cheminFichier, JSON.stringify(jsonData, null, 2));
                console.log(`La carte avec l'ID ${nouveauObjet.id} a été modifiée avec succès.`);
            } else {
                console.log(`Impossible de trouver une carte correspondant à l'ID ${nouveauObjet.id}.`);
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la modification de la carte :", error);
        }
    }
}

async function supprimerCarte(objet) {
    if (await vérifierFichierExiste()) {
        try {
            let jsonData = await loadData();
            let index = jsonData.findIndex((obj) => obj.id === objet.id);
            if (index !== -1) {
                jsonData.splice(index, 1);
                await writeFile(cheminFichier, JSON.stringify(jsonData, null, 2))
                    .then(() => console.log(`La carte avec l'ID ${objet.id} a bien été supprimée`))
                    .catch((err) => console.log("Erreur lors de la suppression de la carte", err));
            } else {
                console.log(`Impossible de trouver une carte correspondant à l'ID ${objet.id}.`);
            }
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la suppression de la carte :', error);
        }
    }
}

//await ajouterCarte(nouveauObjet);

//format attendu lors de l'appel
//envoyer sous format :
//await "fonction"(carte)
//voir exemple d'objet tout en haut du fichier 

export { ajouterCarte, modifierCarte, supprimerCarte };