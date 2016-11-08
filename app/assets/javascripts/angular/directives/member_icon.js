DjelloApp.directive('memberIcon', [ function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/directives/member_icon.html',
    scope: {
      member: '='
    },
    link: function($scope, element, attrs) {
      console.log($scope.member);
      var initialsOf = function(name){
        var names = name.split(' ');
        return names[0][0] + names[1][0];
      };
      $scope.initials = initialsOf($scope.member.name);
    }
  };
}]);
