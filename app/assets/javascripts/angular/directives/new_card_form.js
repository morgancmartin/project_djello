DjelloApp.directive('newCardForm', ['$timeout', function($timeout) {
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
        $scope.showNewCardForm = false;
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
          });
        }
      });
    }
  };
}]);
