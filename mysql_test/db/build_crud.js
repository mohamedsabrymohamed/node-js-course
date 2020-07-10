const connection = require('./connection');

function get_info(coulmn_names, table_name, callback) {
	var sql = 'SELECT ?? from ' + table_name;

	connection.query(
		sql,
		[
			coulmn_names
		],
		function(err, results) {
			if (err) {
				throw err;
			}
			return callback(results);
		}
	);
}

//usage

var query_result = [];
const columns = [
	'id',
	'username'
];
const table = 'test';

get_info(columns, table, function(result) {
	//console.log(result);
	query_result = result;
});

console.log(query_result);

connection.end();
