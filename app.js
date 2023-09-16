//Main inc.
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const errorHandler = require('./middleware/error');
const auth = require('./middleware/auth');
const generalRoutes = require('./routes/general');

app.use(bodyParser.json());

//Auth inc.
app.use(auth);

//Route inc.
app.use(generalRoutes);


//Err inc.
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server ${port} portunda başlatıldı.`);
});
