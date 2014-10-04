function blogControl($scope, $http){
	$http.get('/getAllBlogs').success(function(res){
		console.log(res);
		$scope.blogs = res;
	});

	$scope.deleteBlog = function(blogid){
		console.log(blogid);
		$http.post('/deleteBlog', {id:blogid}).success(function(response){
			$http.get('/getAllBlogs').success(function(res){
			console.log(res);
			$scope.blogs = res;
			});
		});
	};

	$scope.setId = function(blogid){
		console.log(blogid);
		$http.post('/setblogid', {id:blogid}).success(function(res){
			console.log("successfully set id");
		});
	};
}

function weatherContrl($scope, $http){
	var URL = "http://api.worldweatheronline.com/free/v1/weather.ashx?q=02115,USA&format=json&num_of_days=1&key=s3uv4fjbaw4pqtp26rh48afd";
	$http.get(URL).success(function (res){
		$scope.weather = res.data.weather[0];

		console.log($scope.weather.weatherIconUrl[0].value);
	})
}

function newBlog($scope, $http){
	$scope.addNewBlog = function(){
		var blog = {
			title:$scope.title,
			author:$scope.author,
			date:$scope.date,
			context:$scope.context
		};
		$http.post('/addBlog', blog).success(function(response){
			console.log(response);
			$scope.title  = "";
			$scope.author = "";
			$scope.date = "";
			$scope.context = "";
		});
	};
}

function updateBlog($scope, $http){
	var blogid = "";
	var blog = {};
	$http.get('/getblogbyid').success(function(res){
		console.log(res);
		blog = res;
		blogid = blog._id;
		$scope.title = blog.title;
		$scope.author = blog.author;
		$scope.date = blog.date;
		$scope.context = blog.context;
	});

	$scope.updateBlogById = function(){
		var blog = {
			id: blogid,
			title: $scope.title,
			author: $scope.author,
			date: $scope.date,
			context: $scope.context
		};
		$http.post('/updateBlog', blog).success(function(response){
			console.log("successfully update blog: "+ blogid );
		});
	};
	
};