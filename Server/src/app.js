const express = require('express');
const morgan = require('morgan');
var cors = require('cors')
var bodyParser = require('body-parser')

//Inicio
const app = express();
require('./database');

//Settings
app.set('port', process.env.PORT || 3600);

//Middlwares
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(morgan('dev'));
//app.use(express.urlencoded({extended:false}))
app.use(cors());

//Routes
app.use('/', require('./routes/index'));

//Listen Server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});