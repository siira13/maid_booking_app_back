const mysql = require('mysql2');

const config = {
   host: 'localhost',
    user: 'root',
    password: 'Siira@1313',
    database: 'maid_bookig_app_db'
};

//Create connection
const db = mysql.createConnection(config);

//Connect
db.connect(function(err){
    if(err) throw err;
    console.log("DB Connected");
});   
    

module.exports = db;
// module.exports = config;
