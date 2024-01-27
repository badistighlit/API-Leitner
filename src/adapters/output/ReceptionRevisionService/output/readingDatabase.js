import { access, readFile, writeFile } from 'fs/promises';

const url = './src/database.json';

async function vérifierFichierExiste() {
    try {
      await access(url);
      console.log('Le fichier existe');
      return true;
    } catch (erreur) {
      console.log('Le fichier n\'existe pas !');
      return false;
    }
}

async function lireFichier() {
    if(await vérifierFichierExiste()) {
        try {
            const data = await readFile(url, { encoding: 'utf8' });
            const jsonData = JSON.parse(data);
            console.log(jsonData);
        } catch (error) {
            console.error('Il y a eu un problème avec la lecture du fichier: ', error);
        }
    }
}

lireFichier();