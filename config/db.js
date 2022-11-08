require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});

//TESTS
// let sql = "SELECT * FROM book"

// pool.execute(sql, function(err, result){
//     if (err) throw err;

//     result.forEach((res) => {
//         console.log(res.titulo);
//     });
// });

// sql = 'SELECT * FROM book WHERE isbn = 111-1-11-111111-1;'

// pool.execute(sql, function(err, result){
//     if (err) throw err;

//     result.forEach((res) => {
//         console.log(res.titulo);
//     });
// });

module.exports = pool.promise();