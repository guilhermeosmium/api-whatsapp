import { zip, COMPRESSION_LEVEL } from 'zip-a-folder';
import unzipper from 'unzipper';
import fs from 'fs';

class Zip{

    static async unzip(file, destination){

        try{
            const prim = await new Promise((resolve, reject) => {
                fs.createReadStream(file)
                    .pipe(unzipper.Extract({ path: destination}))
                    .on('close', () => {
                        resolve();
                        return true;
                    })
                    .on('error', (e) => {
                        reject(e);
                        return false;
                    })
            });
            return prim;
        } catch(err) {
            console.error('erro zip', err);
            return false;
        }        

    }
    static async zip(folder, file){

        try{
            return await zip(folder, file, {compression: COMPRESSION_LEVEL.high});
        } catch(err) {
            console.error('erro zip', err);
            return false;
        }

    }
  

}

export default Zip;