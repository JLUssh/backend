const mysql = require('mysql2/promise'),
    config = require('./config');

// 创建连接池
const connection = mysql.createPool(
    {
        host: config.DB_HOST,
        user: config.DB_USER,
        database: config.DB_NAME,
        password: config.DB_PASS
    }
);

module.exports = connection;