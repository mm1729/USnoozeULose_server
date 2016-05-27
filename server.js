// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var requestSuper = require('superagent');
var querystring = require('querystring');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/usnoozeulose'); // connect to our database
var User     = require('./app/models/user');
var NessieKey = 'a7eeb741bf7a196b3787add64500118b';
// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'usnoozeulose' });
});

router.post('/login', function(req, res) {
	var user = new User();
	user.username = req.body.username;
	user.password = req.body.password;

	User.find(function(err, users) {
		if(err) res.json({message : String(err)});

		for(i in users)
			if(users[i].username === user.username) {
				if(users[i].password === user.password){
					users[i].loggedIn = true;
					res.json({message : 'logged in',
					'id' : users[i]._id});
				} else {
					res.json({message : 'password is incorrect'})
				}
			}

		res.json({message : 'username not found'});
	});
});

router.post('/signup', function(req, res) {
	/*var user = new User();
	user.username = req.body.username;
	user.password = req.body.password;
	user.loggedIn = false;

	User.find(function(err, users) {
		if(err) res.json({message : String(err)});

		for(var i in users)
			if(users[i].username === user.username)
				res.json({message : 'Duplicate username'});*/

		var http = require('http');
		// check account information
		// get account nickname match phonename
		var options = {
		  host: 'api.reimaginebanking.com',
		  port: 80,
		  path: '/accounts?type=Checking&key=a7eeb741bf7a196b3787add64500118b',
		  method: 'GET'
		};

	http.request(options, function(response) {

	  response.setEncoding('utf8');
		var body = '';
	  response.on('data', function (chunk) {
	    body+=chunk;
	  });
		response.on('end', function() {
			body = JSON.parse(body);
			console.log(body);
			res.json({message : 'done'});
			/*var accountExists = 0;
			if(response.statusCode == 200) { // works
				for(var i in body) {
					var account = body[i];

					if(account.account_number === req.body.account){
						if(account.nickname === req.body.telephone) {
							accountExists = 1;
							user.save(function(err) {
								if (err)
									res.send(err);

								res.json({ message: 'User created!' });
							});
						} else  { // phone does not match
							res.json({ message: 'Phone number is incorrect!' });
						}
					}
				}
				// account does not exist
				if(accountExists == 0)
					res.json({message : 'Account does not exist'});
			} else {
				res.json({message : 'Unable to contact Nessie'});
			}*/
		});
	}).end();

	//});
});

router.post('/send', function(req, res) {
	/*var user = new User();
	user.username = req.body.username;
	user.password = req.body.password;
	user.loggedIn = false;

	User.find(function(err, users) {
		if(err) res.json({message : String(err)});

		for(var i in users)
			if(users[i].username === user.username)
				res.json({message : 'Duplicate username'});*/

		var http = require('http');
		// check account information
		// get account nickname match phonename
		var options = {
		  host: 'api.reimaginebanking.com',
		  port: 80,
		  path: '/accounts?type=Checking&key=a7eeb741bf7a196b3787add64500118b',
		  method: 'GET'
		};

	http.request(options, function(response) {

		var id = req.body.userId;
		var account1 = req.body.account1;
		var account2 = req.body.account2;
		var type1 = req.body.account1Type;
		var type2 = req.body.account2Type;
		var amount = req.body.amount;
		var accId1, accId2;

	  response.setEncoding('utf8');
		var body = '';
	  response.on('data', function (chunk) {
	    body+=chunk;
	  });
		response.on('end', function() {
			body = JSON.parse(body);
			console.log(body);
			var accountExisted = 0;
			if(response.statusCode == 200) { // works
				for(var i in body) {
					var account = body[i];
					if(account._id === req.body.account1){
							accountExisted = 1;
							accId1 = account._id;
					}
				}
				if(accountExisted == 0) // account does not exist
					res.json({message : 'Account does not exist'});

				for(var i in body) {
					var account = body[i];
					if(account._id === req.body.account2){
							accountExisted = 1;
							accId2 = account._id;
					}
				}
				if(accountExisted == 0) // account does not exist
					res.json({message : 'Account does not exist'});
			} else {
				res.json({message : 'Unable to contact Nessie'});
			}

			//http://api.reimaginebanking.com/accounts/5747fc6ada6c68a322a1de43/transfers?key=a7eeb741bf7a196b3787add64500118b


		 // or more concisely

		 var sys = require('sys')

		 var exec = require('child_process').exec;

		 function puts(error, stdout, stderr) {
			 sys.puts(stdout);
			 res.json({message : 'done'});
		  }

		 child = exec("curl -X POST --header \"Content-Type: application/json\" --header \"Accept: application/json\" -d \"{\"medium\": \"balance\", \"payee_id\": \"5747fe83da6c68a322a1de47\", \"amount\" :" + amount + "}\" \"http://api.reimaginebanking.com/accounts/5747fc6ada6c68a322a1de43/transfers?key=a7eeb741bf7a196b3787add64500118b\"", puts);




		});
	}).end();

	//});
});


/*router.post('/send', function(req, res) {
	/*var id = req.body.userId;
	var account1 = req.body.account1;
	var account2 = req.body.account2;
	var type1 = req.body.account1Type;
	var type2 = req.body.account2Type;
	var amount = req.body.amount;
	var accId1, accId2;

/*	User.findById(id, function(err, user) {
		if(err) res.json({message : 'Account unavailable'});
	}*/
	/*console.log('hi');
	// find if account numbers exist
	var options = {
		host: 'api.reimaginebanking.com',
		port: 80,
		path: '/accounts?type=Checking&key=a7eeb741bf7a196b3787add64500118b',
		method: 'GET'
	};

/*http.request(options, function(response) {

	response.setEncoding('utf8');
	var body = '';
	response.on('data', function (chunk) {
		body+=chunk;
	});
	response.on('end', function() {
		body = JSON.parse(body);
			console.log(body);
			/*var accountExisted = 0;
			if(response.statusCode == 200) { // works
				for(var i in body) {
					var account = body[i];
					if(account.account_number === req.body.account1){
							accountExisted = 1;
							accId1 = account_id;
					}
				}
				if(accountExisted == 0) // account does not exist
					res.json({message : 'Account does not exist'});

				for(var i in body) {
					var account = body[i];
					if(account.account_number === req.body.account2){
							accountExisted = 1;
							accId2 = account_id;
					}
				}
				if(accountExisted == 0) // account does not exist
					res.json({message : 'Account does not exist'});
			} else {
				res.json({message : 'Unable to contact Nessie'});
			}*/

			/*options = {
			  host: 'api.reimaginebanking.com',
			  port: 80,
			  path: '/accounts' + accId1 + '/transfers?type=payee&key=' + NessieKey,
			  method: 'POST',
				body : {
					"medium": "balance",
					"payee_id": "5747fe83da6c68a322a1de47",
					"amount" : Number(amount)
				}
			};

			http.request(options, function(response) {
				response.setEncoding('utf8');
				var body = '';
			  response.on('data', function (chunk) {
			    body+=chunk;
			  });
				response.on('end', function() {
					body = JSON.parse(body);
					console.log(body);
				});
			});*/
		/*});
	});
});*/



// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
