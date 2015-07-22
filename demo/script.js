var app = angular.module("main", []);

app.controller("PageController", function ($scope) {
	$scope.pageTitle = "Tree directive test";
	$scope.myTree = [{
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
});

// Main directive
app.directive("treeUi", function ($compile) {
	return {
		replace: false,
		transclude: true,
		restrict: "AEC",
		scope: {
			tree: "=ngModel"
		},
		link: function (scope, el, attrs, ctrl, transclude) {
			var transcludedContent;

			transclude(function (clone) {
				clone.attr("tree-element", "").attr("ng-repeat", "treeItem in tree");
				transcludedContent = clone;
			});

			el.html($compile(transcludedContent)(scope));
		}
	};
});

// Child element directive
app.directive("treeElement", function ($compile) {
	return {
		replace: false,
		restrict: "AEC",
		link: function linker(scope, element) {
			// I never get scope.treeItem in here
			scope.$watch("treeItem", function (newVal) {
				console.log(newVal); // nothing here either
			});

			// This will append a sub-menu to my li, if model has children
			if (scope.treeItem && scope.treeItem.children.length) {
				var clonedTemplate = element.parent().clone(),
					childTree;
				
				clonedTemplate
					.addClass("sub-menu")
					.attr("ng-model", "treeItem.children");
				
				clonedTemplate.find("li").removeAttr("ng-repeat tree-element");
				
				childTree = $compile(clonedTemplate)(scope);
				element.append(childTree);
			}
		}
	};
});