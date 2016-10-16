DjelloApp.factory("listService", ["Restangular", '_', 'cardService', function(Restangular, _, cardService) {

  var _lists = [];
  var listService = {};

  var _findListById = function(id){
    var list = _.find(_lists, function(list){
      return id === list.id;
    });
    return list;
  };


  var _listNeedsUpdating = function(list, params){
    return !!params.title && params.title !== list.title;
  };

  var _removeList = function(listPromise){
    listPromise.then(function(response){
      _.remove(_lists, function(list){
        return list.id === response.id;
      });
    });
  };

  var _deleteList = function(list){
    var response = list.remove();
    _removeList(response);
  };

  listService.getLists = function() {
    return _lists;
  };

  listService.setLists = function(lists){
    cardService.setCards(lists);
    angular.copy(lists, _lists);
    return _lists;
  };

  listService.updateList = function(params){
    var list = _findListById(params.id);
    if(_listNeedsUpdating(list, params)){
      console.log(list);
      list.patch(params)
        .then(
          function(result){
            angular.copy(result, list);
          },
          function(result){
            angular.copy(result, list);
            console.error('failed to update');
          });
    }
  };

  listService.all = function(boardPromise) {
    return boardPromise.then(function(board){
      return Restangular.one('boards', board.id).all("lists").getList()
        .then(function(response){
          angular.copy(response, _lists);
          _.forEach(_lists, function(list){
            cardService.setCards(list, list.cards);
          });
          return _lists;
      });
    });
  };

  listService.create = function(params){
    if(params.title){
      console.log(params);
      return Restangular.one('boards', params.board.id).all('lists').post({
        list: {
          title: params.title,
          description: params.description,
          board_id: params.board.id
        }
      }).then(function(list){
        _lists.push(list);
      });
    }
  };

  Restangular.extendModel('lists', function(list){
    list.delete = function(){
      _deleteList(list);
    };

    list.createCard = function(params){
      params.list_id = list.id;
      return cardService.create(params)
        .then(function(response){
          // list.cards.push(response);
          return response;
        });
    };
    return list;
  });

  return listService;
}]);
