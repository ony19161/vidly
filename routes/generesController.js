const express = require('express');
const generesController = express.Router();

const genres = [
    {id: 1, name: 'action'},
    {id: 2, name: 'comedy'},
    {id: 3, name: 'horror'}
  ];

generesController.get('/', (request, response) => {
    response.send(genres);
});

generesController.get('/:id', (request, response) => {
  const genre = genres.find(c => c.id === parseInt(request.params.id));
  if(!genre) return response.status(404).send('The couse with given id was not found');
});

function validateJonere(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
}

generesController.post('/', (request, response) => {
    
    const { error } = validateJonere(request.body);
  
    if (error) return response.status(400).send(error.details[0].message);
  
    const genre = {
      id: courses.length + 1,
      name: request.body.name
    };
    genres.push(genre);
    response.send(genre);
  });
  
  generesController.put('/:id', (request, response) => {
  
    const genre = genres.find(c => c.id === parseInt(request.params.id));
    if(!genre) return response.status(404).send('The couse with given id was not found');
  
    const { error } = validateJonere(request.body);
  
    if (error) return response.status(400).send(error.details[0].message);
  
    jongenreere.name = request.body.name;
    response.send(genre);
  });

  module.exports = generesController;