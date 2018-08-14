

const express = require('express');
const Chatkit = require('@pusher/chatkit-server');
const bodyParser = require('body-parser');
const https = require('https');
const app =  express();
const port = process.env.PORT || 5000;
const instanceLocator = "v1:us1:d031a961-3f61-46fb-8f62-d226a0d1460c";


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


const chatkit = new Chatkit.default({
  instanceLocator: instanceLocator,
  key: '7867752a-f593-4475-a48d-315879146dbd:d9iGflbYA7TXHgs4BAcTgWOcX/6j6PvqYO686QgbUoA='
});

app.post('/auth', (req, res) => {
  console.log(req.query.user_id)
  const authData = chatkit.authenticate({
    userId: ''
  });
  console.log(authData);
  res.status(authData.status)
     .send(authData);
})

app.listen(port, () => console.log(`Listening on port ${port}`));