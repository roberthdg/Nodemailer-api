const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');

dotenv.config();
 
//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'../app/views'));

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
app.use(helmet.frameguard({action: 'deny'}));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());

module.exports = app 