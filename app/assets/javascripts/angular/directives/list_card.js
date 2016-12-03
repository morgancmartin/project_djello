DjelloApp.directive('listCard', ['ModalService', '$rootScope', '$timeout', function(ModalService, $rootScope, $timeout) {
  return {
    restrict: 'E',
    templateUrl: '/templates/directives/list_card.html',
    scope: {
      card: '=',
      list: '='
    },
    link: function($scope, element, attrs){

      $scope.showModal = function(card) {
        var scrollTop = $scope.getCardContainer().scrollTop;
        ModalService.showModal({
          templateUrl: '/templates/cards/modal.html',
          controller: 'ModalController',
          inputs: {
            card: $scope.card,
            list: $scope.list
          }
        }).then(function(modal){
          modal.element.modal();
          $timeout(function() {
            var cardContainer = $scope.getCardContainer();
            cardContainer.scrollTop = scrollTop;
          }, 100);
          modal.close.then(function(result){
            angular.element.find('.modal-backdrop')[0].remove();
          });
        });
      };

      $scope.getCardContainer = function(){
        return angular.element('.list[data-list-id="' + $scope.list.id + '"]')
               .find('.card-container')[0];
      };

      $scope.scrollToBottomOfList = function(){
        $timeout(function() {
          var cardContainer = $scope.getCardContainer();
          cardContainer.scrollTop = cardContainer.scrollHeight;
        }, 150);
      };

      $rootScope.$on('scroll.list', function(event, listId){
        if(listId === $scope.list.id){
          angular.element(document).ready(function(){
            $scope.scrollToBottomOfList(listId);
          });
        }
      });

      element.bind('click', $scope.showModal);
    }
  };
}]);
