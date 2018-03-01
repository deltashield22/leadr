const mongodb = require('../mongodb');
const conn = mongodb.connection;
const ObjectId = mongodb.ObjectId;

module.exports = {
    readAll: readAll,
    create: create,
    update: update,
    _delete: _delete
}

function readAll() {
    return conn.db().collection('dictionary').find()
        .map(word => {
            word._id = word._id.toString();
            return word;
        }).toArray();
}

function create(model) {
    return conn.db().collection('dictionary').insertOne(model)
        then(result => result.insertedId.toString());
}

function update(id, model) {
    return conn.db().collection('dictionary').replaceOne({_id: new ObjectId(id)}, doc)
        .then(result => Promise.resolve());
}

function _delete(id) {
    return conn.db().collection('dictionary').deleteOne({_id: new ObjectId(id)})
        .then(result => Promise.resolve());
}