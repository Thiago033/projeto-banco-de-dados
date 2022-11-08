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

    //save on database
    async save() {
        let sql = `INSERT INTO book VALUES('${this.isbn}', '${this.titulo}', '${this.autor}', '${this.idioma}', '${this.descricao}', ${this.preco}, ${this.quantidade}, ${this.id_editora})`;
        
        const [newBook, _] = await db.execute(sql);
        
        return newBook;
    }

    //return all books saved on data base
    static findAll() {
        let sql = `SELECT * FROM book;`

        return db.execute(sql);
    }

    //return book by id
    static findById(id){
        let sql = `SELECT * FROM book WHERE isbn = '${id}';`;

        return db.execute(sql);
    }

    static findByIdAndDelete(id) {
        let sql = `DELETE FROM book WHERE isbn = '${id}';`;

        return db.execute(sql);
    }
}