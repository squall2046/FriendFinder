require('dotenv').config();
const mysql = require("mysql");

// MySQL (backup data)
// =============================================================

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
    connection.connect();
} else {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: "friendfinder_db"
    });
    connection.connect(function (err) {
        if (err) {
            console.error("error connecting: " + err.stack);
            return;
        }
        console.log("connected as id " + connection.threadId);
    });
};

module.exports = connection;

