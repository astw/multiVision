angular.module("app").factory("mvAuth",function($http,mvIdentity, $q){
    return{
        authenticationUser:function(username, password){
            var dfd = $q.defer();
            $http.post("/login",
                {
                username:username,
                password:password
                }
            ).then(function(response){
                if(response.data.sucess){
                    console.log("login in");
                    mvIdentity.currentUser = response.data.user;
                    dfd.resolve(true);
                }
                else{
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        }
    }
});