(function() {
	var app = angular.module("main", ["tree-ui"]),
		sampleData = [{
			"name": "Apparel",
			"checked": false,
			"children": [{
				"name": "Mens Shirts",
				"children": [{
					"name": "Mens Special Shirts",
					"children": []
				}]
			}, {
				"name": "Womens Shirts",
				"children": []
			}, {
				"name": "Pants",
				"children": []
			}]
		}, {
			"name": "Boats",
			"children": []
		}];

	app.controller("PageController", function ($scope) {
		$scope.pageTitle = "Tree directive test";
		$scope.myTree = sampleData;
	});
})();