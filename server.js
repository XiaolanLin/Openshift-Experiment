var express = require('express');
var mongojs = require('mongojs');
var mongodburl = process.env.OPENSHIFT_MONGODB_DB_URL || 'nodejs';
var db = mongojs.connect(mongodburl,["blogs"]);

var app = express();

// app.get('/', function(req, res){
// 	res.send("hello world");
// });

var blogid = "";

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

app.post('/setblogid', function(req, res){
	blogid = req.body.id;
	console.log("blogid: "+blogid);
});

app.get('/getblogbyid', function(req, res){
	console.log('getblogbyid = '+ blogid);
	db.blogs.findOne(
		{_id:mongojs.ObjectId(blogid)}, function(err, data){
		console.log(err);
		res.json(data);
		console.log(data);
	});
	blogid = "";
});

app.get('/getAllBlogs', function(req, res){
	db.blogs.find(function(err, data){
		console.log(err);
		res.json(data);
	});
});

app.post('/updateBlog', function(req, res){
	// var blog = {
	// 	title: req.body.title,
	// 	author: req.body.author,
	// 	context: req.body.context,
	// 	date: req.body.date
	// };
	console.log("updateblog   req.body  "+ req.body.id);
	db.blogs.update(
		{_id: mongojs.ObjectId(req.body.id)},
		{$set: 
			{
				title:req.body.title,
				author: req.body.author,
				date: req.body.date,
				context: req.body.context
			} },
			{ upsert: true }

	);
	// ,
	// 		author:req.body.author,
	// 		context:req.body.context,
	// 		date: req.body.date

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