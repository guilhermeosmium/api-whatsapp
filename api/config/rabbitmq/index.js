import amqplib from 'amqplib';
import env from 'dotenv';
env.config();

let ch = null;

async function connect(){
    if(ch==null){
      try{
          const conn = await amqplib.connect(process.env.CLOUDAMQP_URL);
          ch = await conn.createChannel();
          await ch.assertQueue('processa', { durable: true });
        } catch(err){
          console.error(err);
      }        
    }
    return;
}
 
 
  async function sendToQueue(queue, message){
    try{
        return await ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    } catch(err){
        console.error(err);
    }
    return null;
  }
  
  async function consume(queue, callback){
    try{
        return await ch.consume(queue, callback, { noAck: true });
    } catch(err){
        console.error(err);
    }
    return null;    
  }

  async function clear(queue){
    try{
        return await ch.purgeQueue(queue);
    } catch(err){
        console.error(err);
    }
    return null;    
  }  
  
  module.exports = {
    clear,
    connect,
    sendToQueue,
    consume
  }