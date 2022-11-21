const e = require("express");
const db = require("../config/db");

class Book {
    constructor(isbn ,titulo, idioma, descricao, preco, quantidade, id_editora, capa) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.idioma = idioma;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade = quantidade;
        this.id_editora = id_editora;
        this.capa = capa;
    }

    //Save book on database
    async saveBookOnDatabase(option, numPages, fileSize, fontType) {

        let sql = `INSERT INTO livro VALUES('${this.isbn}', '${this.titulo}', '${this.idioma}', '${this.descricao}', ${this.preco}, ${this.quantidade}, ${this.id_editora}, '${this.capa}');`;
        
        const [newBook, _] = await db.execute(sql);

        if (option == 1) {
            sql = `INSERT INTO livro_digital VALUES('${this.isbn}', '${fileSize}', '${fontType}');`;
            await db.execute(sql);

        } else if (option == 2) {
            sql = `INSERT INTO livro_fisico VALUES('${this.isbn}', ${numPages});`;
            await db.execute(sql);

        } else {
            sql = `INSERT INTO livro_digital VALUES('${this.isbn}', '${fileSize}', '${fontType}');`;
            await db.execute(sql);

            sql = `INSERT INTO livro_fisico VALUES('${this.isbn}', ${numPages});`;
            await db.execute(sql);
        }

        return newBook;
    }

    //Return all books on database
    static findAllBooks() {
        let sql = `SELECT * FROM livro;`;

        return db.execute(sql);
    }

    //Return all digital books
    static findAllDigitalBooks() {
        let sql = `SELECT * FROM livro INNER JOIN livro_digital ON livro.isbn = livro_digital.isbn;`;

        return db.execute(sql);
    }

    //Return all fisical books
    static findAllFisicalBooks() {
        let sql = `SELECT * FROM livro INNER JOIN livro_fisico ON livro.isbn = livro_fisico.isbn;`;

        return db.execute(sql);
    }

    //Return book by ISBN
    static findBookByIsbn(isbn){
        let sql = `SELECT * FROM livro WHERE isbn = '${isbn}';`;

        return db.execute(sql);
    }

    //Delete book by ISBN
    static findBookByIsbnAndDelete(isbn) {
        let sql = `DELETE FROM livro WHERE isbn = '${isbn}';`;

        return db.execute(sql);
    }

    //Delete specific quantity from books by ISBN
    static deleteQuantity(isbn, qtd) {
        let sql = `UPDATE livro SET quantidade = ${qtd} WHERE isbn = '${isbn}';`;

        return db.execute(sql);
    }

    static findBookByIsbnAndUpdate(id, res) {
       
        let sql = `
        UPDATE livro
        SET isbn = '${res.isbn}', titulo = '${res.titulo}', idioma = '${res.idioma}', descricao = '${res.descricao}', preco = ${res.preco}, quantidade = ${res.quantidade}, id_editora = ${res.id_editora}
        WHERE isbn = '${id}';`;


        return db.execute(sql);
    }
}

module.exports = Book;