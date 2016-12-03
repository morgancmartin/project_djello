DjelloApp.directive('boardTitlePopover', ['$timeout', 'boardService', function($timeout, boardService) {
  return {
    restrict: 'E',
    templateUrl: '/templates/directives/board_title_popover.html',
    scope: {
      board: '<'
    },
    link: function($scope, element, attrs){
      $scope.showPopover = false;
      $scope.originalTitle = $scope.board.title;

      console.log($scope.board);
      $scope.$watch('showPopover', function(value){
        if(value){
          $timeout(function() {
            var inputElement = element.find('#boardTitleInput')[0];
            inputElement.focus();
            var strLength = $scope.board.title.length * 2;
            inputElement.setSelectionRange(strLength, strLength);
            inputElement.select();
          });
        }
      });

      $scope.focusOut = function(){
        $timeout(function(){
          if (document.activeElement !== element.find('#boardTitleInput')[0] &&
              document.activeElement !== element.find('.board-title-popover')[0]){
            $scope.showPopover = false;
          }
        }, 125);
      };

      $scope.renameBoard = function(){
        console.log($scope.board.title);
        var params = {title: $scope.board.title, board: $scope.board};
        $scope.showPopover = false;
        boardService.updateBoard(params).then(function() {
          $scope.originalTitle = $scope.board.title;
        });
      };
    }
  };
}]);
