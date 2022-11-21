const db = require("../config/db");

class Order {
    constructor(id_usuario, valor_total, situacao, tipo) {
        this.id_usuario = id_usuario;
        this.valor_total = valor_total;
        this.situacao = situacao;
        this.tipo = tipo;
    }

    //save on database
    async saveOrderOnDatabase() {

        let sql = `INSERT INTO pedido(id_usuario, valor_total, situacao, tipo) VALUES(${this.id_usuario}, ${this.valor_total}, '${this.situacao}', ${this.tipo});`;
        
        const [newOrder, _] = await db.execute(sql);
        
        return newOrder;
    }

    //find all orders for user id
    static findAllOrdersById(id){
        let sql = `SELECT * FROM pedido WHERE id_usuario = ${id};`;

        return db.execute(sql);
    }

     //find order by id
     static findOrderById(id){
        let sql = `SELECT * FROM pedido WHERE cod_pedido = ${id};`;

        return db.execute(sql);
    }
}

module.exports = Order;