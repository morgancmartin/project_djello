DjelloApp.directive('boardTitlePopover', ['$timeout', function($timeout) {

  return {
    restrict: 'E',
    templateUrl: '/templates/directives/board_title_popover.html',
    scope: {
      boardTitle: '='
    },
    link: function($scope, element, attrs){
      $scope.showPopover = false;

      $scope.$watch('showPopover', function(value){
        if(value){
          $timeout(function() {
            var inputElement = element.find('#boardTitleInput')[0];
            inputElement.focus();
            var strLength = $scope.boardTitle.length * 2;
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

    }
  };
}]);
