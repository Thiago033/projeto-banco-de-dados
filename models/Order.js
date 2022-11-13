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

    //find all orders for user email
    static findAllOrdersById(email){
        let sql = `SELECT * FROM pedido WHERE email = '${email}';`;

        return db.execute(sql);
    }
 
    static findOrderById(id) {

        let sql = `SELECT * FROM pedido WHERE cod_pedido = ${id};`;

        return db.execute(sql);
    }

    //save on database
    async save() {

        let sql = `INSERT INTO pedido VALUES(NULL, '${this.email}', '${this.isbn}', ${this.valor_total}, ${this.quantidade}, '${this.situacao}')`;
        
        const [newOrder, _] = await db.execute(sql);
        
        return newOrder;
    }

    //payment
    static payment(id) {
        let sql = `UPDATE pedido SET situacao = 'Aprovado' WHERE cod_pedido = ${id};`

        return db.execute(sql);
    }
}

module.exports = Order;