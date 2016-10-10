DjelloApp.directive('listCard', ['ModalService', function(ModalService) {
  return {
    restrict: 'E',
    templateUrl: '/templates/directives/list-card.html',
    scope: {
      card: '='
    },
    link: function($scope, element, attrs){
      $scope.showModal = function(card) {
        ModalService.showModal({
          templateUrl: '/templates/cards/modal.html',
          controller: 'ModalController',
          inputs: {
            card: $scope.card
          }
        }).then(function(modal){
          modal.element.modal();
          modal.close.then(function(result){
            $scope.message = 'You said ' + result;
          });
        });
      };

      element.bind('click', $scope.showModal);
    }
  };
}]);
