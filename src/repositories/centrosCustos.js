const database = require('../config/database');

function getAll() {
    return database;
}

function getById(id) {
    return database.find(element => element.id == id);
}

function getByIdUnidadeOrg(idUnidadeOrg) {
    return database.find(element => element.idUnidadeOrganizacional == idUnidadeOrg);
}

function add(centroCusto) {
    //Encontra o maior id salvo até o momento:
    let maxId=0;
    for(var i=0; i<database.length; i++) {
        if(database[i].id>maxId) maxId=database[i].id;
    }

    //Define o identificador ao elemento e adiciona-o à base
    centroCusto.id = maxId+1;
    database.push(centroCusto);
}

function update(centroCusto) {
    //Localiza a posição do elemento a ser atualizado
    for (var i = 0; i < database.length; i++) {
        if (database[i].id == centroCusto.id) {
            database[i] = centroCusto;
            i = database.length;
        }
    }
}

function remove(centroCusto) {
    for (var i = 0; i < database.length; i++) {
        if (database[i].id == centroCusto.id) {
            database.slice(i, 1);
            i = database.length;
        }
    }
}

module.exports = {
    getAll,
    getById,
    getByIdUnidadeOrg,
    add,
    update,
    remove
}