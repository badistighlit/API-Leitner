import { access, readFile, writeFile } from 'fs/promises';

const objet = {
    id: 1,
    tags: 'tags',
    question: 'qu\'est-ce qui est jaune et qui attend ?',
    reponse: 'Johnatan'
}
const contenuAEcrire = '\n    ' + JSON.stringify(objet);
const cheminFichier = './src/database.json';

async function vérifierFichierExiste() {
    try {
      await access(cheminFichier);
      console.log('Le fichier existe');
      return true;
    } catch (erreur) {
      console.log('Le fichier n\'existe pas !');
      return false;
    }
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

async function ajouterAuFichier(contenuAEcrire, cheminFichier) {

    if(await vérifierFichierExiste()){
        try {
            const contenuActuel = await readFile(cheminFichier, 'utf-8');
            const dernierAccoladeIndex = contenuActuel.lastIndexOf('}');

            if (contenuActuel.trim() === '' ) {
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
  
//await ajouterAuFichier(contenuAEcrire, cheminFichier);
//format attendu lors de l'appel