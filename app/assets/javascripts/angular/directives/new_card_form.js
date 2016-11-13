DjelloApp.directive('newCardForm', ['$timeout', '$rootScope', function($timeout, $rootScope) {
  return {
    restrict: 'E',
    templateUrl: '/templates/directives/new_card_form.html',
    scope: {
      list: '='
    },
    link: function($scope, element, attrs){

      $scope.createNewCard = function(list, title){
        var params = { title: title };
        list.createCard(params);
        $scope.newCardForm = {};
        element.find('.new-card-input').val('');
        $rootScope.$broadcast('scroll.list', list.id);
      };

      $scope.focusOut = function(){
        $timeout(function(){
          $scope.showNewCardForm = false;
        }, 125);
      };

      $scope.$watch('showNewCardForm', function(value){
        if(value){
          $timeout(function() {
            element.find('#newCardInput')[0].focus();
            $scope.attachEnterKeyListener();
            $rootScope.$broadcast('scroll.list', $scope.list.id);
          });
        }
      });

      $scope.attachEnterKeyListener = function(){
        element.find("#newCardInput").keypress(function(event) {
          if (event.which == 13) {
            event.preventDefault();
            $scope.createNewCard($scope.list, element.find('#newCardInput').val());
          }
        });
      };

    }
  };
}]);
