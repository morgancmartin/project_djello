DjelloApp.directive('boardsDropdown', ['$state', function($state) {
  return {
    restrict: 'E',
    templateUrl: '/templates/directives/boards_dropdown.html',
    scope: {
      boards: '=',
      showBoardsDropdown: '=',
      toggleBoardsDropdown: '&'
    },
    link: function($scope, element, attrs){
      $scope.goToBoard = function(boardId){
        $state.go('home.show', {id: boardId});
        $scope.toggleBoardsDropdown();
      };
    }
  };
}]);
