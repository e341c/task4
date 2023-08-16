const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mD2760C1oT",
    database: "task4",
});

module.exports = db