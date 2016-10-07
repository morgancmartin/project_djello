//board show controller

DjelloApp.controller('boardShowCtrl', ['$scope', 'Restangular', 'board', 'boardService', 'boards', '$state', function($scope, Restangular, board, boardService, boards, $state) {

  $scope.board = board;
  $scope.boards = boards;
  $scope.selected = board;


  $scope.$watch('selected', function(state){
    if(state){
      $state.go('home.boards.show', {id: state.id});
    }
  });

  $scope.deleteCurrentBoard = function(){
    $scope.board.delete();
  };

}]);
