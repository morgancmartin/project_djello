DjelloApp.directive('newListForm', [function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/directives/new_list_form.html',
    scope: {
      list: '=',
      board: '='
    },
    link: function($scope, element, attrs){
      $scope.createList = function(title){
        var params = {title: title};
        $scope.board.createList(params)
          .then(function(response){
            $scope.newListForm = {};
          }, function(response){
            console.error(response);
          });
      };

    }
  };
}]);
