DjelloApp.controller('boardShowCtrl', ['$scope', 'Restangular', 'board', 'boardService', 'boards', '$state', 'listService', '$sce', 'cardService', '$document', '$timeout', '$rootScope', function($scope, Restangular, board, boardService, boards, $state, listService, $sce, cardService, $document, $timeout, $rootScope) {


  // Targeting body for state specific styling...
  // open to ideas on this
  angular.element('body').addClass('board-show');

  $scope.board = board;
  $scope.boards = boards;
  $scope.selected = board;
  $scope.boardShow = true;
  $scope.lists = listService.getLists();
  $scope.cards = cardService.getCards();

  $scope.$on('list.updated', function(eventName, params){
    if(params.title || params.description){
      params.board_id = board.id;
      listService.updateList(params);
    }
  });

  $scope.$on('card.updated', function(eventName, params){
    if(params.title || params.description){
      cardService.updateCard(params);
    }
  });

  $scope.deleteCurrentBoard = function(){
    $scope.board.delete();
  };

  $scope.removeList = function(list){
    list.delete();
  };

  $scope.renameBoard = function(title){
    var params = {title: title, board: board};
    $scope.boardRenamePopoverIsOpen = false;
    boardService.updateBoard(params);
  };

  $scope.focusBoardRenameInput = function(){
    $timeout(function() {
      var element = angular.element.find('#boardRenameInput')[0];
      element.focus();
      var strLength = $scope.board.title.length * 2;
      element.setSelectionRange(strLength, strLength);
      element.select();
    }, 150);
  };

  $scope.dynamicPopover = {
    templateUrl: 'myPopoverTemplate.html'
  };

  console.log('loaded boardshowctrl');
}]);
