DjelloApp.factory("cardService", ["Restangular", '_', function(Restangular, _) {

  var cardService = {};
  var _cards = [];

  cardService.create = function(params){
    return Restangular.one('lists', params.list_id).all('cards').post({
      card: {
        title: params.title,
        list_id: params.list_id
      }
    }).then(function(card){
      console.log(card);
      _cards.push(card);
    });
  };

  return cardService;
}]);
