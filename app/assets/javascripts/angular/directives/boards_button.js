DjelloApp.directive('boardsButton', ['$timeout', '$state', function($timeout, $state) {

  var attachJelloImg = function(jelloImg){
    angular.element('.image-container')
      .prepend(jelloImg.clone());
  };

  return {
    restrict: 'E',
    templateUrl: '/templates/directives/boards_button.html',
    scope: {
      jelloImg: '=',
      boards: '='
    },
    link: function($scope, element, attrs){
      attachJelloImg($scope.jelloImg);
      $scope.showBoardsDropdown = false;

      $scope.toggleBoardsDropdown = function($event) {
        if(!$scope.justToggledBoards){
          $scope.showBoardsDropdown = !$scope.showBoardsDropdown;
          if($scope.showBoardsDropdown){
            $timeout(function(){
              angular.element('#boards-dropdown').focus();
            }, 125);
          } else {
            $scope.justToggledBoards = true;
            $timeout(function(){
              $scope.justToggledBoards = false;
            }, 125);
          }
        }
      };

      $scope.goToBoard = function(boardId){
        $state.go('home.show', {id: boardId});
        $scope.toggleBoardsDropdown();
      };

    }
  };
}]);
