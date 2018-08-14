

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
  key: 
});

app.post('/auth', (req, res) => {
  console.log(req.query.user_id)
  const authData = chatkit.authenticate({
    userId: req.query.user_id
  });
  console.log(authData.body);
  res.status(authData.status)
     .send(authData.body);
})

app.listen(port, () => console.log(`Listening on port ${port}`));