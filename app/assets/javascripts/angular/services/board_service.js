DjelloApp.factory("boardService", ["Restangular", '_', 'listService', function(Restangular, _, listService) {

  var _boards = [];
  var boardService = {};

  var _removeBoard = function(boardPromise){
    console.log('removing board from collection');
    boardPromise.then(function(response){
      _.remove(_boards, function(board){
        return board.id === response.id;
      });
    });
  };

  var _deleteBoard = function(board){
    var response = board.remove();
    _removeBoard(response);
  };

  boardService.create = function(params){
    Restangular.all('boards').post(params).then(function(board){
      _boards.push(board);
    });
  };

  boardService.all = function() {
    return Restangular.all("boards").getList().then(function(response){
      angular.copy(response, _boards);
      return _boards;
    });
  };

  boardService.find = function(id) {
    var promise = Restangular.one('boards', id).get();
    // listService.setLists(promise);
    listService.all(promise);
    return promise;
  };

  Restangular.extendModel('boards', function(board){
    board.delete = function(){
      _deleteBoard(board);
    };
    board.createList = function(params){
      params.board_id = board.id;
      return listService.create(params)
        .then(function(response){
          board.lists.push(response);
          return response;
        });
    };
    return board;
  });
  return boardService;
}]);
