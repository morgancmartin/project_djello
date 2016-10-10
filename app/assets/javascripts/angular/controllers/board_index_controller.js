//board index controller


DjelloApp.controller("boardIndexCtrl", ['$scope', 'Restangular', 'Auth', 'boards', 'boardService', function($scope, Restangular, Auth, boards, boardService) {

  angular.element('body').removeClass('board-show');
  $scope.boards = boards;
  $scope.newBoardForm = {};

  $scope.createBoard = function(title){
    var params = {title: title};
    boardService.create(params);
    $scope.newBoardForm.title = '';
    $scope.showNewBoardForm = false;
  };

  $scope.dynamicPopover = {
    templateUrl: 'myPopoverTemplate.html'
  };

  Auth.currentUser()
    .then(function(user) {
      $scope.currentUser = user;
    }, function(response) {
      console.error(response);
    });

  console.log('loaded boardindexctrl');
}]);
