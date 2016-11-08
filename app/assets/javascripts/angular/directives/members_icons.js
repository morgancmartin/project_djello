DjelloApp.directive('membersIcons', [ function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/directives/members_icons.html',
    scope: {
      members: '='
    },
    link: function($scope, element, attrs) {}
  };
}]);
