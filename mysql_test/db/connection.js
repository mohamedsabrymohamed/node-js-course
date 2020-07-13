const host = 'localhost'
const username = 'root'
const password = ''
const databse_name = 'task_manager'

//const mysql = require('mysql');
const mariadb = require('mariadb/callback');
// const connection = mysql.createConnection({
//   host: host,
//   user: username,
//   password: password,
//   database: databse_name
// });

const conn = mariadb.createConnection({
  host: host, 
  user:username,
  password: password,
  database:databse_name
});
conn.connect(err => {
if (err) {
console.log("not connected due to error: " + err);
} else {
console.log("connected ! connection id is " + conn.threadId);
}
});
 

module.exports = conn