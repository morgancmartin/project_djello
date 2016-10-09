//board show controller

DjelloApp.controller('boardShowCtrl', ['$scope', 'Restangular', 'board', 'boardService', 'boards', '$state', 'listService', function($scope, Restangular, board, boardService, boards, $state, listService) {


  // Targeting body for state specific styling...
  // open to ideas on this
  angular.element('body').addClass('board-show');

  $scope.board = board;
  $scope.boards = boards;
  $scope.selected = board;
  $scope.boardShow = true;
  $scope.lists = listService.getLists();

  $scope.$watch('selected', function(state){
    if(state){
      $state.go('home.show', {id: state.id});
    }
  });

  $scope.$on('list.updated', function(eventName, params){
    params.board_id = board.id;
    listService.updateList(params);
  });

  $scope.createList = function(){
    $scope.board.createList($scope.newListForm)
      .then(function(response){
        $scope.newListForm = {};
      }, function(response){
        console.error(response);
      });
  };

  $scope.removeList = function(list){
    list.delete();
  };

  $scope.deleteCurrentBoard = function(){
    $scope.board.delete();
  };

  console.log('loaded boardshowctrl');


}]);
