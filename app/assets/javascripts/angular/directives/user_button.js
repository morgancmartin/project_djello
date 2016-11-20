DjelloApp.directive('userButton', ['Auth', '$timeout', function(Auth, $timeout) {

  var initializeName = function(name){
    var names = name.split(' ');
    return names[0][0] + names[1][0];
  };

  return {
    restrict: 'E',
    templateUrl: '/templates/directives/user_button.html',
    scope: {},
    link: function($scope, element, attrs){
      $scope.showUserDropdown = false;
      Auth.currentUser()
        .then(function(user) {
          $scope.currentUser = user;
          $scope.initials = initializeName($scope.currentUser.name);
        }, function(response) {
          console.error(response);
        });

      $scope.toggleUserDropdown = function($event) {
        if(!$scope.justToggledDropdown){
          $scope.showUserDropdown = !$scope.showUserDropdown;
          if($scope.showUserDropdown){
            console.log('focusing');
            $timeout(function(){
              angular.element('#user-btn-dropdown').focus();
            }, 125);
          } else {
            $scope.justToggledDropdown = true;
            $timeout(function(){
              $scope.justToggledDropdown = false;
            }, 125);
          }
        }
      };

    }
  };
}]);
