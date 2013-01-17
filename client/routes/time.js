var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'webster',
  database : 'blockviewer'
});
connection.connect();	

exports.day = function(req, res){	
	console.log('Fetch gexf day graph by Unix Time -> ' + req.params.day); 
	if (req.params.format.toLowerCase() === 'gexf') {
		connection.query('SELECT gexf FROM day WHERE graphTime <= ? ORDER BY graphTime desc LIMIT 1', [req.params.day], function(e, r) {
			if (e) {
				console.log(e);
				res.send({error: 'An error occured with the database'}, 500);
				return;
			}
			if (r.length !== 1) {
				console.log('Result returned something other than 1.');
				res.send({error: 'Date not found.'}, 500);
				return;
			}
			res.send(r.pop().gexf);
		});	
	} else {
		res.send({error: 'Unsupported filetype specified'}, 500);
	}
};