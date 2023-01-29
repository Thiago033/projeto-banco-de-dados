const db = require("../config/db");

class User {
    constructor(email, nome, telefone, endereco, senha) {
        this.email = email
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.senha = senha;
    }

        //Save user on database
        async save() {
            let sql = `INSERT INTO usuario(email, nome, telefone, endereco, senha) VALUES('${this.email}', '${this.nome}', '${this.telefone}', '${this.endereco}', '${this.senha}');`;
            
            const [newUser, _] = await db.execute(sql);
            
            return newUser;
        }

    //return all users saved on data base
    static findAll() {
        let sql = `SELECT * FROM usuario;`;

        return db.execute(sql);
    }

    //return all users with specify email
    static findUserByEmail(email){
        let sql = `SELECT * FROM usuario WHERE email = '${email}';`;

        return db.execute(sql);
    }

    //return all users with specify id
    static findUserById(id){
        let sql = `SELECT * FROM usuario WHERE id_usuario = ${id};`;

        return db.execute(sql);
    }
}

module.exports = User;