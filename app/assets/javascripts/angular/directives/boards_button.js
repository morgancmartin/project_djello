DjelloApp.directive('boardsButton', [function() {

  var attachJelloImg = function(jelloImg){
    angular.element('#board-button-img-container')
      .prepend(jelloImg.clone());
  };

  return {
    restrict: 'E',
    templateUrl: '/templates/directives/boards_button.html',
    scope: {
      jelloImg: '=',
      boards: '=',
      toggleBoardsDropdown: '&'
    },
    link: function($scope, element, attrs){
      attachJelloImg($scope.jelloImg);
    }
  };
}]);
