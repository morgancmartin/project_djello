DjelloApp.directive('editDescriptionForm', ['cardService', '$timeout', function(cardService, $timeout) {
  return {
    restrict: 'E',
    templateUrl: '/templates/directives/edit_description_form.html',
    scope: {
      card: '=',
      list: '='
    },
    link: function($scope, element, attrs){
      $scope.description = $scope.card.description;
      console.log($scope.list);
      $scope.updateDescription = function(description){
        var params = {description: description,
                      list_id: $scope.list.id,
                      id: $scope.card.id};
        $scope.showDescriptionForm = false;
        cardService.updateCard(params);
      };
      $scope.$watch('showDescriptionForm', function(value){
        if(value){
          $timeout(function() {
            element.find('#descriptionInput')[0].focus();
          });
        }
      });
      $scope.focusOut = function(){
        $timeout(function(){
          $scope.showDescriptionForm = false;
        }, 125);
      };
    }
  };
}]);
