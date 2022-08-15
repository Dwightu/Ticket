import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  const options = stan
    .subscriptionOptions()
    // Let Service to tell NATs whether we have received the events
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('accounting-service');

// Queue groups makes the same service won't receive the same event and handle them simultaneously
  const subscription = stan.subscribe(
    'ticket:created',
    'queue-group-name',
    options
  );

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    // Means the service received the events
    msg.ack();
  });
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());


abstract class Listener {
  abstract queueGroupName:string;
  abstract subject:string;
  abstract onMessage(data:any,msg:Message):void;
  private client:Stan;
  protected ackWait=5*1000;


  constructor(client:Stan){
    this.client=client;
  }

  subscriptionOptions(){
    return this.client.subscriptionOptions().setDeliverAllAvailable()
    .setManualAckMode(true).setAckWait(this.ackWait).setDurableName(this.queueGroupName);
  }

  listen(){
    const subscription=this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    )
    subscription.on('message',(msg:Message)=>{
      console.log(
        `Message received: ${this.subject}${this.queueGroupName}`
      )
      const parseData=this.parseMessage(msg);
      this.onMessage(parseData,msg);
    })
  }
  parseMessage(msg:Message){
      const data=msg.getData();
      return typeof data==='string'?JSON.parse(data):JSON.parse(data.toString('utf8'));
  }

}