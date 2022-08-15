import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';


const stan = nats.connect('ticketing','abc',{
    url: 'http://localhost:4222',
});

stan.on('connect',()=>{
    console.log('Publisher connected to nats')
    const data = JSON.stringify({
        id: '123',
        title: 'concert',
        price: 20,
      });
    
      stan.publish('ticket:created', data, () => {
        console.log('Event published');
      });
})