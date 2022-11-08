const db = require("../config/db");

class Book {
    constructor(isbn ,titulo, autor, idioma, descricao, preco, quantidade, id_editora) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.idioma = idioma;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade = quantidade;
        this.id_editora = id_editora;
    }
    
    //return all books saved on data base
    static findAll() {
        let sql = `SELECT * FROM book;`

        return db.execute(sql);
    }
}