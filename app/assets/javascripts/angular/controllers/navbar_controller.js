DjelloApp.controller("navCtrl", ['$scope', 'Restangular', 'Auth', 'boards', 'boardService', '$compile', '$state', '$timeout', function($scope, Restangular, Auth, boards, boardService, $compile, $state, $timeout) {

  $scope.boards = boards;

  (function() {
    $scope.rootPath = angular.element('nav').data('root-path');
    $scope.jelloImg = angular.element('#jello-img').remove();
    $scope.djelloImg = angular.element('#djello-img').remove();
    angular.element('.brand-image-container').prepend($scope.djelloImg);
    angular.element('.brand-image-container').prepend($scope.jelloImg);
    $scope.logoutLink = angular.element('nav').data('logout-link');
  })();

}]);
