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