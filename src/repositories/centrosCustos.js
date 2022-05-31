const database = require('../config/database');

class CentrosCustosRepository {

    getAll() {
        return database;
    }

    get(id) {
        return database.find(element => element.id == id);
    };


}
module.exports = CentrosCustosRepository;
