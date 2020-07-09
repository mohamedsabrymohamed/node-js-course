 const connection = require('./connection')

function get_info(coulmn_names  , table_name, callback){

  var sql = "SELECT ?? from " +table_name;

  connection.query(sql,  [coulmn_names], function(err, results){
        if (err){ 
          throw err;
        }
        //console.log(results); // good
        //stuff_i_want = results[0].objid;  // Scope is larger than function
        //stuff_i_want = results;
        return callback(results);
      })
}


//usage

var stuff_i_want  ;
const columns = ['id', 'username'];
const table = 'test';

get_info(columns ,table, function(result){
     stuff_i_want=JSON.stringify(result)
  //console.log(JSON.stringify(result))
});

console.log(stuff_i_want)

//console.log(get_info(columns ,table, function(result){}))

 
connection.end();
