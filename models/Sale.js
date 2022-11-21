const db = require("../config/db");

class Sale {
    constructor(cod_pedido ,isbn, quantidade) {
        this.cod_pedido = cod_pedido;
        this.isbn = isbn;
        this.quantidade = quantidade;
    }

    //save on database
    async saveSaleOnDatabase() {

        let sql = `INSERT INTO venda VALUES(${this.cod_pedido}, '${this.isbn}', ${this.quantidade})`;
        
        const [newSale, _] = await db.execute(sql);
        
        return newSale;
    }

    //find sale by id
    static findSaleById(id){
        let sql = `SELECT * FROM venda WHERE cod_pedido = ${id};`;

        return db.execute(sql);
    }
}

module.exports = Sale;