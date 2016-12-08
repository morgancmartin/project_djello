DjelloApp.directive('editInPlace', ['$rootScope', function($rootScope) {
  return {
    restrict: 'A',
    scope: {
      value: '@',
      id: '@',
      attrType: '@'
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
        if(newProps !== oldProps){
          var params = {
            id: parseInt($scope.id),
            title: newProps
          };
          var message = $scope.attrType + '.updated';
          console.log('broadcasting ' + message);
          console.log(params);
          $rootScope.$broadcast(message, params);
        }
      });

      $scope.offEdit = function(){
        $scope.editing = false;
        element.removeClass('active');
      };

    }
  };
}]);
