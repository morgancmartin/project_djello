var DjelloApp = angular.module('DjelloApp', ['Devise', 'ui.router', 'restangular', 'xeditable', 'ui.bootstrap']);

DjelloApp.factory('_', ['$window', function($window){
  return $window._;
}]);

DjelloApp.run(function(editableOptions, editableThemes){
  editableOptions.theme = 'bs3';
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
});

DjelloApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home/boards");

  $stateProvider
    .state("home", {
      url: "/home",
      abstract: true,
      // templateUrl: '/templates/nav/nav.html',
      views: {
        'navbar': {
          templateUrl: '/templates/nav/nav.html',
          controller: 'navCtrl'
        }
      },
      resolve: {
        boards: ['boardService', function(boardService){
          return boardService.all();
        }]
      }
    })
    .state('home.index', {
      url: '/boards',
      views: {
        '@': {
          templateUrl: '/templates/boards/index.html',
          controller: 'boardIndexCtrl'
        }
      }
    })
    .state('home.show', {
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
