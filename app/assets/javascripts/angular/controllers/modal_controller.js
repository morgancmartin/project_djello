DjelloApp.controller('ModalController', ['$scope', 'close', 'card', 'list', '$timeout', 'cardService', 'memberService', '_', function($scope, close, card, list, $timeout, cardService, memberService, _) {

  $scope.card = card;
  $scope.list = list;

  $scope.members = memberService.getMembers();

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
