const db = require("../config/db");

class Author {
    constructor(isbn ,autor) {
        this.isbn = isbn;
        this.autor = autor;
    }

    //Save book on database
    async saveAuthorsOnDatabase() {
        let sql = `INSERT INTO autor VALUES('${this.isbn}', '${this.autor}');`;
        
        const [newBook, _] = await db.execute(sql);
    }

    static findAuthorsByIsbn(isbn){
        let sql = `SELECT * FROM autor WHERE isbn = '${isbn}';`;

        return db.execute(sql);
    }
    
}

module.exports = Author;