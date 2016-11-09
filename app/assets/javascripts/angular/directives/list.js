DjelloApp.directive('list', [function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/directives/list.html',
    scope: {
      list: '=',
      cards: '='
    },
    link: function($scope, element, attrs){
      console.log($scope.list);
      console.log($scope.cards);
      $scope.removeList = function(list){
        list.delete();
      };
    }
  };
}]);
