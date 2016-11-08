DjelloApp.controller('ModalController', ['$scope', 'close', 'card', 'list', '$timeout', 'cardService', 'memberService', '_', 'boardService', function($scope, close, card, list, $timeout, cardService, memberService, _, boardService) {

  $scope.card = card;
  $scope.list = list;
  $scope.boardMembers = [];

  boardService.find(list.board_id).then(function(board){
    angular.copy(board.users, $scope.boardMembers);
  });

  $scope.markCompleted = function(){
    $scope.card.delete();
    close('Cancel');
  };

  $scope.$watch('showMemberInput', function(value){
    if(value){
      $timeout(function() {
        var element = angular.element.find('#memberInput')[0];
        element.focus();
      });
    }
  });

  $scope.addMember = function($item){
    var params = {
      member_id: $item.id,
      board_id: card.list().board().id
    };
    if(params.member_id && params.board_id){
      memberService.addMemberToBoard(params);
    }
  };

  $scope.dynamicPopover = {
    templateUrl: 'memberPopoverTemplate.html'
  };

}]);
