DjelloApp.factory("listService", ["Restangular", '_', function(Restangular, _) {

  var _lists = [];
  var listService = {};

  var _findListById = function(id){
    var list = _.find(_lists, function(list){
      return id === list.id;
    });
    return list;
  };


  var _listNeedsUpdating = function(list, params){
    if(params.title && params.title !== list.title){
      return true;
    }
    return false;
  };

  var _removeList = function(listPromise){
    console.log('removing board from collection');
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

  listService.setLists = function(boardPromise){
    boardPromise.then(function(board){
      board.lists = Restangular
        .restangularizeCollection(board, board.lists, 'lists');
      angular.copy(board.lists, _lists);
    });
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
            // couldn't think of a good way to handle
            // this case. currently the user must refresh
            // the page to recognize that their request didn't
            // go through
            console.error('failed to update');
          });
    }
  };

  listService.all = function(boardPromise) {
    return boardPromise.then(function(result){
      console.log(result.id);
      return Restangular.one('boards', result.id).all("lists").getList()
        .then(function(response){
          angular.copy(response, _lists);
          return _lists;
      });
    });
  };

  listService.create = function(params){
    return Restangular.one('boards', params.board_id).all('lists').post({
      list: {
        title: params.title,
        description: params.description,
        board_id: params.board_id
      }
    }).then(function(list){
        console.log(list);
      _lists.push(list);
    });
  };

  Restangular.extendModel('lists', function(list){
    list.delete = function(){
      _deleteList(list);
    };
    return list;
  });

  return listService;
}]);
