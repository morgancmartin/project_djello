DjelloApp.controller("navCtrl", ['$scope', 'Restangular', 'Auth', 'boards', 'boardService', '$compile', '$state', '$timeout', function($scope, Restangular, Auth, boards, boardService, $compile, $state, $timeout) {

  $scope.boards = boards;
  $scope.showBoardsDropdown = false;
  $scope.toggleBoardsDropdown = function($event) {
    console.log('toggling');
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

  (function() {
    $scope.rootPath = angular.element('#navbar').data('root-path');
    $scope.jelloImg = angular.element('#jello-img').remove();
    $scope.djelloImg = angular.element('#djello-img').remove();
    angular.element('#my-brand').prepend($scope.djelloImg);
    angular.element('#my-brand').prepend($scope.jelloImg);
    $scope.logoutLink = angular.element('#navbar').data('logout-link');
  })();

  Auth.currentUser()
    .then(function(user) {
      $scope.currentUser = user;
    }, function(response) {
      console.error(response);
    });
}]);
