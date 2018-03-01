const latinService = require('../services/latin.service')

module.exports = {
    create: create,
    update: update,
    readAll: readAll,
    delete: _delete
}

function readAll(req, res) {
    latinService.readAll()
        .then(response => {
           const words = response.items;
           res.json(words);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
}

function update(req, res) {
    latinService.update(req.params.id, req.model) 
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
}

function create(req, res) {
    latinService.create(req.model)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
}

function _delete(req, res) {
    latinService._delete(req.params.id)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
}