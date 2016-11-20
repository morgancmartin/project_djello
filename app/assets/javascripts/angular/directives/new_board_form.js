DjelloApp.directive('newBoardForm', ['$timeout', 'boardService', '$state', function($timeout, boardService, $state) {
  return {
    restrict: 'E',
    templateUrl: '/templates/directives/new_board_form.html',
    scope: {
      list: '='
    },
    link: function($scope, element, attrs){

      $scope.createBoard = function(title){
        var params = {title: title};
        boardService.create(params).then(function(board){
          console.log(board);
          $scope.newBoardForm.title = '';
          $scope.showNewBoardForm = false;
          $state.go("home.show", {id: board.id});
        });
      };

      $scope.$watch('showNewBoardForm', function(value){
        if(value){
          $timeout(function() {
            element.find('#newBoardInput')[0].focus();
          });
        }
      });

      $scope.focusOut = function(){
        $timeout(function(){
          if (document.activeElement !== element.find('#newBoardInput')[0] &&
              document.activeElement !== element.find('.new-board-form')[0]){
            $scope.showNewBoardForm = false;
          }
        }, 125);
      };

      $scope.attachEnterKeyListener = function(){
        element.find("#newBoardInput").keypress(function(event) {
          if (event.which == 13) {
            event.preventDefault();
            $scope.createBoard($scope.newBoardForm.title);
          }
        });
      };

      $scope.attachEnterKeyListener();
    }
  };
}]);
