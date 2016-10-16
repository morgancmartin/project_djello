DjelloApp.controller('ModalController', ['$scope', 'close', 'card', 'list', '$timeout', 'cardService', function($scope, close, card, list, $timeout, cardService) {
  $scope.card = card;
  $scope.list = list;
}]);
