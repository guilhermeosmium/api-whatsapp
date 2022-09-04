import env from 'dotenv';
const ftp = require("basic-ftp") 
env.config();

class FtpClass{

    constructor(){
        this.client = new ftp.Client();
        this.client.ftp.verbose = true;
    }

    async conect(){
        try {

            //FTP_PASSWORD 
            //FTP_SECURE=false
            await this.client.access({
                host: process.env.FTP_HOST,
                user: process.env.FTP_USER,
                password: process.env.FTP_PASSWORD,
                secure: process.env.FTP_SECURE
            })
            console.log(await this.client.list())
            return true;
        }
        catch(err) {
            console.log('ftp', err);
        }      
        return false;
    }

    async upload(file, destino){
        try{
            return await this.client.uploadFrom(file, destino);
        }
        catch(err) {
            console.log('ftp', err);
        }      
        return false;            
    }

    async download(file, origem){
        try{
            return await this.client.downloadTo(file, origem);
        }
        catch(err) {
            console.log('ftp', err);
        }      
        return false;            
    }  
    
    async close(){
        try{
            return await this.client.close();
        }
        catch(err) {
            console.log('ftp', err);
        }      
        return false;            
    }     

}

export default FtpClass;