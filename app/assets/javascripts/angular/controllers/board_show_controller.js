DjelloApp.controller('boardShowCtrl', ['$scope', 'Restangular', 'board', 'boardService', 'boards', '$state', 'listService', '$sce', 'cardService', '$document', function($scope, Restangular, board, boardService, boards, $state, listService, $sce, cardService, $document) {


  // Targeting body for state specific styling...
  // open to ideas on this
  angular.element('body').addClass('board-show');

  $scope.board = board;
  $scope.boards = boards;
  $scope.selected = board;
  $scope.boardShow = true;
  $scope.lists = listService.getLists();
  $scope.cards = cardService.getCards();

  $scope.$watch('selected', function(state){
    if(state){
      $state.go('home.show', {id: state.id});
    }
  });

  $scope.$on('list.updated', function(eventName, params){
    params.board_id = board.id;
    listService.updateList(params);
  });

  $scope.$on('card.updated', function(eventName, params){
    cardService.updateCard(params);
  });

  $scope.deleteCurrentBoard = function(){
    $scope.board.delete();
  };

  $scope.removeList = function(list){
    list.delete();
  };

  $scope.renameBoard = function(title){
    var params = {title: title, board: board};
    boardService.updateBoard(params);
  };

  $scope.dynamicPopover = {
    templateUrl: 'myPopoverTemplate.html'
  };

  console.log('loaded boardshowctrl');
}]);
