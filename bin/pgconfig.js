const Pool = require('pg').Pool;

var pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "BDStyleme", 
    password: "msgbox23*",
    port: 5432,
});

// var pool = new Pool({
//     user: "nsolucoe_usermedpag",
//     host: "localhost",
//     database: "nsolucoe_medpag", 
//     password: "[a23p10r78]*",
//     port: 5432,
// });

exports.pool = pool;



