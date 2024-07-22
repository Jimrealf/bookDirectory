const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bookDirectory',
    password: 'jimjam22',
    port: 5432,
});

module.exports = pool;
