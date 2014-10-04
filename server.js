var express = require('express');
var mongojs = require('mongojs');
var mongodburl = process.env.OPENSHIFT_MONGODB_DB_URL || 'nodejs';
var db = mongojs.connect(mongodburl,["blogs"]);

var app = express();

// app.get('/', function(req, res){
// 	res.send("hello world");
// });

app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.get('/env', function(req, res){
	res.send(process.env);
});

app.post('/addBlog', function(req, res){

	var blog = req.body;
	db.blogs.insert(blog, function(err,doc){
		console.log(err);
		res.json(doc);
	});

});

app.get('/getAllBlogs', function(req, res){
	db.blogs.find(function(err, data){
		console.log(err);
		res.json(data);
	});
});

app.post('/deleteBlog', function(req,res){
	var id = req.body.id;
	console.log(id);
	db.blogs.remove({
		_id:mongojs.ObjectId(id)
	}, function(err, doc){
		res.json(doc);
	});

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