DjelloApp.directive('list', [function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/directives/list.html',
    scope: {
      list: '=',
      cards: '='
    },
    link: function($scope, element, attrs){
      $scope.removeList = function(list){
        console.log('hello andur');
        list.delete();
      };
    }
  };
}]);
