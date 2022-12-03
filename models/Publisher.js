const db = require("../config/db");

class Publishers {
    constructor(id_editora, cnpj ,nome_editora) {
        this.id_editora = id_editora
        this.cnpj = cnpj;
        this.nome_editora = nome_editora;
    }

    //return all publishers saved on data base
    static findAllPublishers() {
        let sql = `SELECT * FROM editora;`;

        return db.execute(sql);
    }

    //
    static findPublisherById(id_editora){
        let sql = `SELECT * FROM editora WHERE id_editora = ${id_editora};`;

        return db.execute(sql);
    }


    //return all books from publisher with id = ${id_editora}
    static findAllBooksByPublisherId(id_editora){
        let sql = `SELECT * FROM livro WHERE id_editora = ${id_editora};`;

        return db.execute(sql);
    }

}

module.exports = Publishers;