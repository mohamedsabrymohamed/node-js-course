const host = 'localhost'
const username = 'root'
const password = ''
const databse_name = 'task_manager'

const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : host,
  user     : username,
  password : password,
  database : databse_name
});
 

module.exports = connection