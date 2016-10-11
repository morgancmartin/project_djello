DjelloApp.factory("cardService", ["Restangular", '_', function(Restangular, _) {

  var cardService = {};
  var _cards = {};


  // cardService.all = function(listPromise) {
  //   return listPromise.then(function(list){
  //     return Restangular.one('lists', list.id).all("cards").getList()
  //       .then(function(response){
  //         angular.copy(response, list.cards);
  //         return list.cards;
  //       });
  //   });
  // };

  var _restangularizeCards = function(lists){
    _.forEach(lists, function(list){
      Restangular.restangularizeCollection(list, list.cards, 'cards');
    });
  };

  cardService.setCards = function(lists){
    _restangularizeCards(lists);
    _.forEach(lists, function(list){
      if(!_cards[list.id]){
        _cards[list.id] = [];
      }
      console.log(list.cards);
      angular.copy(list.cards, _cards[list.id]);
      console.log(_cards[list.id]);
    });
  };

  cardService.getCards = function(){
    return _cards;
  };

  cardService.create = function(params){
    return Restangular.one('lists', params.list_id).all('cards').post({
      card: {
        title: params.title,
        list_id: params.list_id
      }
    }).then(function(card){
      console.log(card);
      if(!_cards[params.list_id]){
        _cards[params.list_id] = [];
      }
      _cards[params.list_id].push(card);
      console.log(_cards[params.list_id]);
      return card;
    });
  };

  return cardService;
}]);
