const db = require("../config/db");

class Order {
    constructor(cod_pedido ,email, isbn, valor_total, quantidade, situacao) {
        this.cod_pedido = cod_pedido;
        this.email = email;
        this.isbn = isbn;
        this.valor_total = valor_total;
        this.quantidade = quantidade;
        this.situacao = situacao;
    }

    //save on database
    async save() {

        let sql = `INSERT INTO pedido VALUES(${this.cod_pedido}, '${this.email}', '${this.isbn}', ${this.valor_total}, ${this.quantidade}, '${this.situacao}')`;
        
        const [newOrder, _] = await db.execute(sql);
        
        return newOrder;
    }
}

module.exports = Order;