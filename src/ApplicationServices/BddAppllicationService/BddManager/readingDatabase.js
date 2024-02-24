import { access, readFile } from 'fs/promises';

const url = 'src/database.json'

//const url = '../../../database.json'


async function vérifierFichierExiste() {
    try {
        await access(url);
        //console.log('Le fichier existe');
        return true;
    } catch (erreur) {
        console.log(erreur);
        console.log('Le fichier n\'existe pas !');
        return false;
    }
}

async function verifierFichierNonVide() {
    const contenu = await readFile(url, { encoding: 'utf8' });

    if (!contenu){
        console.log('Le fichier est vide')
    } else{
        return JSON.parse(contenu);
    }

}

async function lireFichier() {
    if(await vérifierFichierExiste()) {
        try {
            return await verifierFichierNonVide();
        } catch (error) {
            console.error('Il y a eu un problème avec la lecture du fichier: ', error);
        }
    }
}

export { lireFichier };