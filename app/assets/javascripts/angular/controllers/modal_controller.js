DjelloApp.controller('ModalController', ['$scope', 'close', 'card', 'list', '$timeout', 'cardService', 'memberService', '_', 'boardService', function($scope, close, card, list, $timeout, cardService, memberService, _, boardService) {

  $scope.close = close;
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

  $scope.toggleMember = function($item){
    var params = {
      member_id: $item.id,
      card_id: card.id
    };
    if(params.member_id && params.card_id){
      memberService.toggleCardMember(params).then(function(response){
        if(response){
          card.refresh();
          console.log(card.users);
        }
      });
    }
  };

  $scope.dynamicPopover = {
    templateUrl: 'memberPopoverTemplate.html'
  };

}]);
