DjelloApp.directive('newCardForm', [function() {
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
    }
  };
}]);
