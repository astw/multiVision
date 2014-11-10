angular.module("app").controller('mvNavBarLoginCtrl',function($scope, $http){
    $scope.signin = function(username, password){
        console.log("need to do");
        $http.post("/login",{
            username:username,
            password:password
        }).then(function(resonse){
            if(resonse.data.sucess){
                console.log("login in")
            }
            else
            {
                console.log("failed login");
            }
        })
    }
});