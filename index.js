
const config = require('config');
const helmet = require('helmet');
const Joi = require('joi'); // because joi returns a class
const logger = require('./logger');
const authenticate = require('./Authentication');
const generesController = require('./routes/generesController');
const homeController = require('./routes/homeController');
const express = require('express');
const app = express();

// using a middlewire in request processing pipeline
// to get post body parameters as json

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());


app.use('/', homeController);
app.use('/api/generes', generesController);




app.use(logger);
app.use(authenticate);

const port = process.env.PORT || 3300;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});







