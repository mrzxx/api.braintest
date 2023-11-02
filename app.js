//Main inc.
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

//Inc's here.
const errorHandler = require('./middleware/error');
const error404Handler = require('./middleware/error404');
const auth = require('./middleware/auth');
const generalRoutes = require('./routes/general');
const adminRoutes = require('./routes/admin');
const userData = require('./controllers/userdata');
const userdataModel =  require('./models/userdata');

const userdataController = require('./controllers/userdata');
const sendNotification = require('./firebase/notification');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Admin Routes here.
//app.use('/admin', adminRoutes);

//Version Control here.
app.get('/version',userdataController.get_app_version);

//Auth module here.
app.use(auth);

//Routes here.
app.use(generalRoutes);




let intervalInMilliseconds;

async function test() {
  try {

    let data = await userData.send_notification_about_test();
    console.log("Bildirim paketi yayınlandı",data," kullanıcı etkilendi.");
    // Güncel interval'i al
    let updatedData = await userdataModel.get_app_version();
    intervalInMilliseconds = updatedData.notification * 1000;
    get_time();
  } catch (error) {
    console.error(error);
  }

}

async function get_time() {
  try {
    let data = await userdataModel.get_app_version();
    let time = data.notification;
    intervalInMilliseconds = time * 1000;
    
    setTimeout(test, intervalInMilliseconds);

  } catch (error) {
    console.error(error);
  }

}

get_time();

//sendNotification({title:'Raven Test Çöz',body:'Solve test and improve your brain power!'},'e-9BBc6STsCB4eHXFogLtz:APA91bHlGwSGxRpta7J8rleMjr_YH2r8LnWWZegOnSEXzCbBY4V0TPupleHzOcRCTsQ3tpmGhfVmyf8lK8AfWGV44icomSPFXS3qvWgSaXn4O6rKfNwrZU_Y5ZQ6EzFkF--LhFLWxVQw');



//Error handler here.
app.use(errorHandler);

//Error handler here.
app.use(error404Handler);






//RUN SERVER
//For server:
/*
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
*/


//RUN SERVER
app.listen(port, () => {
  console.log(`Server ${port} portunda başlatıldı.`);
});



