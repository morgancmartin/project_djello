var DjelloApp = angular.module('DjelloApp', ['Devise', 'ui.router', 'restangular']);

DjelloApp.factory('_', ['$window', function($window){
  return $window._;
}]);

DjelloApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home/boards");

  $stateProvider
    .state("home", {
      url: "/home",
      abstract: true,
      resolve: {
        boards: ['boardService', function(boardService){
          return boardService.all();
        }]
      }
    })
    .state('home.boards', {
      url: '/boards',
      views: {
        '@': {
          templateUrl: '/templates/boards/index.html',
          controller: 'boardIndexCtrl'
        }
      }
    })
    .state('home.boards.show', {
      url: '/show/:id',
      views: {
        '@': {
          templateUrl: '/templates/boards/show.html',
          controller: 'boardShowCtrl'
        }
      },
      resolve: {
        board: ['boardService', '$stateParams', function(boardService, $stateParams){
          return boardService.find($stateParams.id);
        }]
      }
    });
}]);

// Restangular config
DjelloApp.config(
  ['RestangularProvider',
  function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');
}]);

// Errors
DjelloApp.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});
