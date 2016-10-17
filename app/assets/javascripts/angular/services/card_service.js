DjelloApp.factory("cardService", ["Restangular", '_', function(Restangular, _) {

  var cardService = {};
  var _cards = {};

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
      _addListToCards(list.cards, list);
      angular.copy(list.cards, _cards[list.id]);
    });
  };

  var _addListToCards = function(cards, list){
    _.forEach(list.cards, function(card){
      card.list = function(){
        return list;
      };
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
    console.log(card);
    console.log(params);
    return (!!params.title && params.title !== card.title) ||
      (!!params.description && params.description !== card.description);
  };

  // var _getCardsBoard = function(card){
  //   var list = listService.findListById(card.list_id);
  // };

  cardService.updateCard = function(params){
    console.log(params);
    var card = _findCardById(params.id);
    if(card && _cardNeedsUpdating(card, params)){
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

  var _removeCard = function(cardPromise){
    cardPromise.then(function(response){
      _.forEach(_cards, function(list){
        _.remove(list, function(card){
          return card.id === response.id;
        });
      });
    });
  };

  var _deleteCard = function(card){
    var response =
        Restangular
        .one('lists', card.list_id)
        .one('cards', card.id)
        .remove();
    _removeCard(response);
  };

  Restangular.extendModel('cards', function(card){
    card.update = function(params){
      console.log(params);
      return Restangular
        .one('lists', params.list_id)
        .one('cards', params.id)
        .patch(params);
    };
    card.delete = function(){
      _deleteCard(card);
    };
    return card;
  });

  return cardService;
}]);
