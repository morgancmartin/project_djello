DjelloApp.factory("boardService", ["Restangular", '_', function(Restangular, _) {

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
    return Restangular.one("boards", id).get();
  };

  Restangular.extendModel('boards', function(board){
    board.delete = function(){
      _deleteBoard(board);
    }; return board;}); return boardService;
}]);




  // var _createBoard = function(params){
  //   return Restangular.all('boards').post({
  //     board: {
  //       item_name: params.title,
  //       buy_sell: params.buySell,
  //       description: params.description,
  //       user_id: 1              //hard-coded
  //     }
  //   })
  //     .then(function(response) {
  //       console.log(response);
  //       _boards.unshift(response);
  //       return _boards;
  //     });
  // };

  // var _updateBoard = function(params) {
  //   Restangular.one('boards', $stateParams.id).patch({
  //     board: {
  //       item_name: params.title,
  //       buy_sell: params.buySell,
  //       description: params.description,
  //       user_id: 1              //hard-coded
  //     }
  //   }).then(function() {
  //     $state.go("show", {id: $stateParams.id});
  //   });
  // };

  // var _updateBoard = function(params) {
  //   Restangular.one('boards', $stateParams.id).patch({
  //     board: {
  //       item_name: params.title,
  //       buy_sell: params.buySell,
  //       description: params.description,
  //       user_id: 1              //hard-coded
  //     }
  //   }).then(function() {
  //     $state.go("show", {id: $stateParams.id});
  //   });
  // };
