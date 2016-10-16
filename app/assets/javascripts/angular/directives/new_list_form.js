DjelloApp.directive('newListForm', ['$timeout', function($timeout) {
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
        if(title){
          $scope.board.createList(params)
            .then(function(response){
              $scope.newListForm = {};
              $scope.showNewListForm = false;
            }, function(response){
              console.error(response);
            });
        }
      };
      $scope.$watch('showNewListForm', function(value){
        if(value){
          $timeout(function() {
            element.find('#newListInput')[0].focus();
          });
        }
      });
      $scope.off = function(){
        console.log('off');
      };
      $scope.focusOut = function(){
        $timeout(function(){
          $scope.showNewListForm = false;
        }, 125);
      };

    }
  };
}]);
