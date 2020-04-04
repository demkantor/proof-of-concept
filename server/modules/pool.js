const pg = require('pg');
let config = {};


    config = {
        // user: null || 'con',
        // password: null || 'secretpass', 
        host: 'localhost', 
        port: 5432,
        database: 'proof_of_concept', 
        max: 10, 
        idleTimeoutMillis: 30000, 
    };


module.exports = new pg.Pool(config);