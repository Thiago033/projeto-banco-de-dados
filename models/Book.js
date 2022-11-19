const db = require("../config/db");

class Book {
    constructor(isbn ,titulo, autor, idioma, descricao, preco, quantidade, id_editora, capa) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.idioma = idioma;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade = quantidade;
        this.id_editora = id_editora;
        this.capa = capa;
    }

    //Save book on database
    async save() {
        let sql = `INSERT INTO book VALUES('${this.isbn}', '${this.titulo}', '${this.autor}', '${this.idioma}', '${this.descricao}', ${this.preco}, ${this.quantidade}, ${this.id_editora}, '${this.capa}');`;
        
        const [newBook, _] = await db.execute(sql);
        
        return newBook;
    }

    //Return all books on database
    static findAll() {
        let sql = `SELECT * FROM book;`;

        return db.execute(sql);
    }

    //Return book by ISBN
    static findById(isbn){
        let sql = `SELECT * FROM book WHERE isbn = '${isbn}';`;

        return db.execute(sql);
    }

    //Delete book by ISBN
    static findByIdAndDelete(isbn) {
        let sql = `DELETE FROM book WHERE isbn = '${isbn}';`;

        return db.execute(sql);
    }

    //Delete specific quantity from books by ISBN
    static deleteQuantity(isbn, qtd) {
        let sql = `UPDATE book SET quantidade = ${qtd} WHERE isbn = '${isbn}';`;

        return db.execute(sql);
    }

    static findByIdAndUpdate(id, res) {
       
        let sql = `
        UPDATE book
        SET isbn = '${res.isbn}', titulo = '${res.titulo}', autor = '${res.autor}', idioma = '${res.idioma}', descricao = '${res.descricao}', preco = ${res.preco}, quantidade = ${res.quantidade}, id_editora = ${res.id_editora}
        WHERE isbn = '${id}';`;


        return db.execute(sql);
    }
}

module.exports = Book;