const Person = require('../models/person.model.js');

// Create and Save a new Person
exports.create = (req, res) => {
    // Validate request
    if(!req.body.role) {
        return res.status(400).send({
            message: "Person role can not be empty"
        });
    }

    // Create a Person
    const person = new Person({
        name: req.body.name || "Unamed Person", 
        role: req.body.role
    });

    // Save Person in the database
    person.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Person."
        });
    });
};

// Retrieve and return all persons from the database.
exports.findAll = (req, res) => {
    Person.find()
    .then(persons => {
        res.send(persons);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Persons."
        });
    });
};

// Find a single person with a personId
exports.findOne = (req, res) => {
    Person.findById(req.params.personId)
    .then(person => {
        if(!person) {
            return res.status(404).send({
                message: "Person not found with id " + req.params.personId
            });            
        }
        res.send(person);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Person not found with id " + req.params.personId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving person with id " + req.params.personId
        });
    });
};

// Update a person identified by the personId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.role) {
        return res.status(400).send({
            message: "Person role can not be empty"
        });
    }

    // Find person and update it with the request body
    Person.findByIdAndUpdate(req.params.personId, {
        name: req.body.name || "Unamed Person",
        role: req.body.role
    }, {new: true})
    .then(person => {
        if(!person) {
            return res.status(404).send({
                message: "Person not found with id " + req.params.personId
            });
        }
        res.send(person);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Person not found with id " + req.params.personId
            });                
        }
        return res.status(500).send({
            message: "Error updating person with id " + req.params.personId
        });
    });
};

// Delete a person with the specified personId in the request
exports.delete = (req, res) => {
    Person.findByIdAndRemove(req.params.personId)
    .then(person => {
        if(!person) {
            return res.status(404).send({
                message: "Person not found with id " + req.params.personId
            });
        }
        res.send({message: "Person deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Person not found with id " + req.params.personId
            });                
        }
        return res.status(500).send({
            message: "Could not delete person with id " + req.params.personId
        });
    });
};