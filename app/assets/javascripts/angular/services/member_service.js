DjelloApp.factory("memberService", ["Restangular", '_', function(Restangular, _) {
  var _members = [];
  var memberService = {};

  memberService.all = function() {
    return Restangular.all("users").getList().then(function(response){
      angular.copy(response, _members);
      return _members;
    });
  };

  memberService.addMemberToBoard = function(params){
    if(params.member_id && params.board_id){
      Restangular
        .one('users', params.member_id)
        .patch(params)
        .then(function(response){
          console.log(response);
      });
    }
  };

  memberService.getMembers = function() {
    return _members;
  };
  return memberService;
}]);
