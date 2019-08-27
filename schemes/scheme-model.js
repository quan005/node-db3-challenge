const db = require('../data/db-config.js');


module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
    update,
    remove
};

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
        .where({id})
        .first();
}

function findSteps(scheme_id) {
    return db('steps as st')
        .join('schemes as s', 's.id', 'st.scheme_id')
        .select('st.id', 's.scheme_name', 'st.step_number', 'st.instructions')
        .where({scheme_id});
}

function add(schemeData) {
    return db('schemes')
        .insert(schemeData)
        .then(ids => {
            return findById(ids[0])
        });
}

function addStep(stepData, id) {
    return db('steps')
        .insert(stepData)
        .then(ids => {
            return findById(ids[0])
        })
}

function update(changes, id) {
    return db('schemes')
        .where({id})
        .update(changes)
        .then(ids => {
            return findById(id)
        });
}

function remove(id) {
    return db('schemes')
        .where({id})
        .del();
}