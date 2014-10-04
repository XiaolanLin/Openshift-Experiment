var express = require('express');
var mongojs = require('mongojs');
// var db = mongojs.connect("mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/",
// 	["blogs"]);
var app = express();

var db = mongojs('mongodb://admin:wHmAJUrIDRLG@$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/', ["blogs"]);

// var dbhost = process.env.OPENSHIFT_MONGODB_DB_HOST || 'nodejs' ;
app.get('/', function(req, res){
	// res.send("hello world");?\
	// res.json({hello:"world"});
	console.log(OPENSHIFT_MONGODB_DB_HOST, OPENSHIFT_MONGODB_DB_PORT);
	// res.send(dbhost);
	
});

app.get('/env', function(req, res){
	res.json(process.env);
});

app.get('/addBlog', function(req, res){
	var blog = {
		title: req.query.title,
		author: req.query.author,
		context: req.query.context,
		date: req.query.date
	};
	db.blogs.insert(blog, function(err,doc){
		console.log(err);
		res.json(doc);
	});

});

app.get('/getAllBlogs', function(req, res){
	db.blogs.find(function(err, data){
		res.json(data);
	});
});

app.get('/deleteBlog/:id', function(req,res){
	var id = req.params.id;
	db.blogs.remove({
		_id:mongojs.ObjectId(id)
	}, function(err, doc){
		res.json(doc);
	});

	console.log("deleteBlogbyId" + id);

});

app.get('/updateBlog/:id', function(req, res){
	var blog = {
		title: req.query.title,
		author: req.query.author,
		context: req.query.context,
		date: req.query.date
	};
	db.blogs.findAndModify({
		query:{_id:mongojs.ObjectId(req.params.id)},
		update: {$set: {title:req.query.title,
			author:req.query.author,
			context:req.query.context,
			date: req.query.date}},
		new: true
	}, function(err, doc, lastErrorObject){
		res.json(doc);
	});

});

app.get('/addBlog/:id', function(req, res){
	var id = req.params.id;
	db.blogs.remove(
		{_id:mongojs.ObjectId(id)}, 
		function(err,doc){
			res.json(doc);
		});
});

 //===============Connection Settings=====================//

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;


app.listen(port, ipaddress);