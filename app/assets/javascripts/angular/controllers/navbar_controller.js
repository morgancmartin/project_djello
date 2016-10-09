DjelloApp.controller("navCtrl", ['$scope', 'Restangular', 'Auth', 'boards', 'boardService', '$compile', function($scope, Restangular, Auth, boards, boardService, $compile) {

  $scope.rootPath = angular.element('#navbar').data('root-path');
  $scope.jelloImg = angular.element('#jello-img').remove();
  $scope.djelloImg = angular.element('#djello-img').remove();
  angular.element('#my-brand').prepend($scope.djelloImg);
  angular.element('#my-brand').prepend($scope.jelloImg);
  $scope.logoutLink = angular.element('#navbar').data('logout-link');

  Auth.currentUser()
    .then(function(user) {
      $scope.currentUser = user;
    }, function(response) {
      console.error(response);
    });
}]);
