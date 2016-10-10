DjelloApp.directive('list', [function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/directives/list.html',
    scope: {
      list: '='
    },
    link: function($scope, element, attrs){
      $scope.removeList = function(list){
        list.delete();
      };
    }
  };
}]);
