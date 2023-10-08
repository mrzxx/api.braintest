//Main inc.
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

//For server.
const production = false;

if(production){
  const https = require('https');
  const http = require('http');
  const fs = require('fs');
  const options = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem')
  };
}
//For server.

//Inc's here.
const errorHandler = require('./middleware/error');
const auth = require('./middleware/auth');
const generalRoutes = require('./routes/general');
const adminRoutes = require('./routes/admin');
const userData = require('./controllers/userdata');
const userdataModel =  require('./models/userdata');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Admin Routes here.
app.use('/admin', adminRoutes);

//Auth module here.
//app.use(auth);

//Routes here.
app.use(generalRoutes);




async function test(){
  let data = await userData.send_notification_about_test();
  console.log(data);
}

async function get_time(){
  let data = await userdataModel.get_app_version();
  let time = data.notification;
  const intervalInMilliseconds = time * 1000;
  setInterval(test, intervalInMilliseconds);
}
get_time();




//Error handler here.
app.use(errorHandler);






//RUN SERVER
//For server:
if(production){
  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(options, app);
  httpsServer.listen(443, () => {
      console.log('HTTPS server is running on port 443');
  });
  httpServer.listen(80, () => {
      console.log('HTTP server is running on port 80');
  });
};
//For localhost:
if(!production){
  app.listen(port, () => {
    console.log(`Server ${port} portunda başlatıldı.`);
  });
}
//RUN SERVER


