DjelloApp.directive('editInPlace', ['$rootScope', function($rootScope) {
  return {
    restrict: 'E',
    scope: {
      value: '@',
      id: '@',
      updateList: '&'
    },
    templateUrl: '/templates/directives/edit_in_place.html',
    link: function($scope, element, attrs){
      var inputElement = angular.element(element.children()[1]);
      element.addClass('edit-in-place');
      $scope.editing = false;
      $scope.edit = function(){
        $scope.editing = true;
        element.addClass('active');
        inputElement[0].focus();
        inputElement[0].setSelectionRange(0, $scope.value.length);
      };
      $scope.$watch('value', function(newProps, oldProps){
        var params = {
          id: parseInt($scope.id),
          title: newProps
        };
        $rootScope.$broadcast('list.updated', params);
      });
      $scope.offEdit = function(){
        $scope.editing = false;
        element.removeClass('active');
      };
    }
  };
}]);
