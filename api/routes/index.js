import Auth from '../middlewares/auth';


export default function (app) {    
    
    app.get('/payment/process', function(req, res){
        res.send('ok');
    });
    

}