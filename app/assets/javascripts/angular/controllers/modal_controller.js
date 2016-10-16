DjelloApp.controller('ModalController', ['$scope', 'close', 'card', 'list', '$timeout', 'cardService', function($scope, close, card, list, $timeout, cardService) {
  $scope.card = card;
  $scope.list = list;
  console.log(list);
  $scope.markCompleted = function(){
    $scope.card.delete();
    close('Cancel');
  };
}]);
