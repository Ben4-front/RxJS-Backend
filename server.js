const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');
const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');

const app = new Koa();
const router = new Router();

app.use(cors());

router.get('/messages/unread', (ctx) => {

  const hasNewMessages = Math.random() > 0.5; 
  
  const messages = [];

  if (hasNewMessages) {
    const count = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < count; i++) {
      messages.push({
        id: uuidv4(),
        from: faker.internet.email(),
        subject: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
        received: Math.floor(Date.now() / 1000),
      });
    }
  }

  ctx.body = {
    status: "ok",
    timestamp: Math.floor(Date.now() / 1000),
    messages: messages
  };
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});