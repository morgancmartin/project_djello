//board index controller


DjelloApp.controller("boardIndexCtrl", ['$scope', 'Restangular', 'Auth', 'boards', 'boardService', function($scope, Restangular, Auth, boards, boardService) {

  angular.element('body').removeClass('board-show');
  $scope.boards = boards;
  $scope.newBoardForm = {};

  $scope.createBoard = function(){
    console.log($scope.newBoardForm);
    boardService.create($scope.newBoardForm);
  };

  Auth.currentUser()
    .then(function(user) {
      $scope.currentUser = user;
    }, function(response) {
      console.error(response);
    });

  console.log('loaded boardindexctrl');
}]);
