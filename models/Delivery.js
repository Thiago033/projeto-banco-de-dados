const db = require("../config/db");

class Delivery {
    constructor(cod_rastreamento, frete, endereco, email) {
        this.cod_rastreamento = cod_rastreamento;
        this.frete = frete;
        this.endereco = endereco;
        this.email = email;
    }

    //Save book on database
    async saveDeliveryOnDatabase(order) {

        let sql = `INSERT INTO entrega VALUES();`;
        const [newDelivery, _] = await db.execute(sql);

        let codEntrega = newDelivery.insertId;

        if (order.tipo == 1) {
            sql = `INSERT INTO entrega_digital VALUES(${codEntrega}, '${this.email}')`;
            await db.execute(sql);
        } else {
            sql = `INSERT INTO entrega_fisica VALUES(${codEntrega}, '${this.cod_rastreamento}', ${this.frete}, '${this.endereco}');`;
            await db.execute(sql);
        }
        
        sql = `UPDATE pedido SET situacao = 'Aprovado', cod_entrega = ${codEntrega} WHERE cod_pedido = ${order.cod_pedido};`;
        await db.execute(sql);

        return newDelivery;
    }
}

module.exports = Delivery;