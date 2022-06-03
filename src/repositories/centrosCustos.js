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
    const ultimoId = Math.max(database.map(cc => cc.id));

    //Define o identificador do elemento a ser adicionado:
    centroCusto.id = ultimoId + 1;

    //Adiciona o novo elemento à base:
    database.push(centroCusto);



}

function update(centroCusto) {
    //Remove o elemento antigo
    remove(centroCusto);

    //insere o elemento atualizado
    database.push(centroCusto);
}

function remove(centroCusto) {
    for (var i=0; i<database.length; i++) {
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
