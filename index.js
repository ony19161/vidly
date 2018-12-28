
const config = require('config');
const helmet = require('helmet');
const Joi = require('joi'); // because joi returns a class
const logger = require('./logger');
const authenticate = require('./Authentication');
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




app.use(logger);
app.use(authenticate);

const port = process.env.PORT || 3300;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});


const joneres = [
  {id: 1, name: 'action'},
  {id: 2, name: 'comedy'},
  {id: 3, name: 'horror'}
];

app.get('/', (request, response) => {
  response.render('index', {title: 'My Express App', message: 'Hello Ony !!!'});
});


app.get('/api/joneres', (request, response) => {
    response.send(joneres);
});

app.get('/api/joneres/:id', (request, response) => {
  const jonere = joneres.find(c => c.id === parseInt(request.params.id));
  if(!jonere) return response.status(404).send('The couse with given id was not found');
});

function validateJonere(jonere) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(jonere, schema);
}

app.post('/api/joneres', (request, response) => {
    
    const { error } = validateJonere(request.body);
  
    if (error) return response.status(400).send(error.details[0].message);
  
    const jonere = {
      id: courses.length + 1,
      name: request.body.name
    };
    joneres.push(jonere);
    response.send(jonere);
  });
  
  app.put('/api/joneres/:id', (request, response) => {
  
    const jonere = joneres.find(c => c.id === parseInt(request.params.id));
    if(!jonere) return response.status(404).send('The couse with given id was not found');
  
    const { error } = validateJonere(request.body);
  
    if (error) return response.status(400).send(error.details[0].message);
  
    jonere.name = request.body.name;
    response.send(jonere);
  });