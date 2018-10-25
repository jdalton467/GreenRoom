

const express = require('express');
const Chatkit = require('@pusher/chatkit-server');
const bodyParser = require('body-parser');
const https = require('https');
const app =  express();
const port = process.env.PORT || 5000;
const instanceLocator = "v1:us1:7583eed7-34f4-4200-86bf-0a3ecb78f886";


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


const chatkit = new Chatkit.default({
  instanceLocator: instanceLocator,
  key: '579e2822-ef38-4142-aa68-3fae323921c6:SBb5oGXPHxBAylsnwjgNcaMj3gaX5rmKRul7XZhjURQ='
})

app.post('/auth', (req, res) => {
  console.log(req.query.user_id)
  const authData = chatkit.authenticate({
    userId: req.query.user_id
  });
  console.log(authData);
  res.status(authData.status)
     .send(authData.body);
})

app.listen(port, () => console.log(`Listening on port ${port}`));