module.exports = (app) => {
    const persons = require('../controllers/person.controller.js');

    // Create a new person
    app.post('/persons', persons.create);

    // Retrieve all persons
    app.get('/persons', persons.findAll);

    // Retrieve a single person with personId
    app.get('/persons/:personId', persons.findOne);

    // Update a person with personId
    app.put('/persons/:personId', persons.update);

    // Delete a person with personId
    app.delete('/persons/:personId', persons.delete);
}