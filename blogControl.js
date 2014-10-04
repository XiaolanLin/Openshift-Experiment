function blogControl($scope, $http){
	url = "/getAllBlog";

	$http.get("/getAllBlog").success(function(res){
		$scope.blogs = res;
	});

}