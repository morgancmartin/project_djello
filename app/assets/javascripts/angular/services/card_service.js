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

  var _findCardById = function(id){
    console.log(_cards);
    var card;
    _.find(_cards, function(cards){
      if(!card){
        card = _.find(cards, function(card){
          return id === card.id;
        });
      }
    });
    console.log(card);
    return card;
  };

  var _cardNeedsUpdating = function(card, params){
    return !!params.title && params.title !== card.title ||
      !!params.description && params.description !== card.description;
  };


  cardService.updateCard = function(params){
    var card = _findCardById(params.id);
    if(_cardNeedsUpdating(card, params)){
      console.log(card);
      params.list_id = card.list_id;
      console.log(params);
      card.update(params)
        .then(
          function(result){
            angular.copy(result, card);
          },
          function(result){
            angular.copy(result, card);
            console.error('failed to update');
          });
    }
  };


  Restangular.extendModel('cards', function(card){
    card.update = function(params){
      console.log(params);
      return Restangular
        .one('lists', params.list_id)
        .one('cards', params.id)
        .patch(params);
    };

    return card;
  });

  return cardService;
}]);
