const db = require("../config/db");

class Publishers {
    constructor(cnpj ,nome_editora) {
        this.cnpj = cnpj;
        this.nome_editora = nome_editora;
    }

    //return all publishers saved on data base
    static findAll() {
        let sql = `SELECT * FROM editora;`

        return db.execute(sql);
    }

}

module.exports = Publishers;