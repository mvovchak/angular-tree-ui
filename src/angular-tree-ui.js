(function (angular) {
	var treeUi = angular.module("tree-ui", []);

	treeUi.directive("treeUi", function ($compile) {
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

	treeUi.directive("treeElement", function ($compile) {
		return {
			replace: false,
			restrict: "AEC",
			link: function linker(scope, element) {
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
})(window.angular);