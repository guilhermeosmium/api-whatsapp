import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import {connect} from './config/rabbitmq';

import swaggerUi from 'swagger-ui-express';

const swaggerSpecV1 = require('./swagger_output.json');
const swaggerSpecV2 = require('./swagger_output-pt-br.json');

import env from 'dotenv';
env.config();

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({
    strict: true
}));
const corsOptions = {
    exposedHeaders: ['x-total-count', 'x-draw'],
};
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    safeFileNames: true,
    limits: { fileSize: 60 * 1024 * 1024 }
}));


app.use(cors(corsOptions));

//route
import Routes from './routes';
Routes(app);



var swaggerHtmlV1 = swaggerUi.generateHTML(swaggerSpecV1)
var swaggerHtmlV2 = swaggerUi.generateHTML(swaggerSpecV2)

app.use('/doc', swaggerUi.serveFiles(swaggerSpecV1))
app.get('/doc', (req, res) => { res.send(swaggerHtmlV1) });

app.use('/doc_br', swaggerUi.serveFiles(swaggerSpecV2))
app.get('/doc_br', (req, res) => { res.send(swaggerHtmlV2) });



//gerar token
//gerar token
//gerar token
//gerar token

import ResponseBuilder from './helpers/responseBuilder';
import jwt from 'jsonwebtoken';
//default

app.get('/token_alfred_dev', async (req, res) => {

    
    const token = await jwt.sign(
        { 
            permission: 1, //1 provider, 2 franchise, 3 master
            provider: 10309,
            limitDate: '2023-12-31 23:59:59' 
        },
        ResponseBuilder.getTokenSecret(),//return 'ebano-api';
      );

    res.send(token);
    //res.send('Hello Alfred Api!');
});





app.get('/', function (req, res) {
    res.status(200).send('Alfred API - Verifica nossa documentação (/doc).');
});  

app.get('*', function (req, res) {
    res.status(404).send('Alfred API - Não encontramos.');
});

const port = process.env.SERVER_PORT || 5000;
app.listen(port, async () => {
    await connect();
    console.log('Server is running on PORT ', port)
});