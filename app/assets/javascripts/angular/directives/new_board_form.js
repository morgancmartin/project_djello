DjelloApp.directive('newBoardForm', ['$timeout', 'boardService', function($timeout, boardService) {
  return {
    restrict: 'E',
    templateUrl: '/templates/directives/new_board_form.html',
    scope: {
      list: '='
    },
    link: function($scope, element, attrs){
      $scope.createBoard = function(title){
        var params = {title: title};
        boardService.create(params);
        $scope.newBoardForm.title = '';
        $scope.showNewBoardForm = false;
      };

      $scope.$watch('showNewBoardForm', function(value){
        console.log(value);
        if(value){
          console.log(element.find('#newBoardInput')[0]);
          $timeout(function() {
            element.find('#newBoardInput')[0].focus();
          });
        }
      });
      $scope.focusOut = function(){
        $timeout(function(){
          $scope.showNewBoardForm = false;
        }, 125);
      };
    }
  };
}]);
