angular.module("app").controller("mvCourseListCtrl", function($scope,mvCachedCourses){
    $scope.courses = mvCachedCourses.query();

    $scope.sortOptions = [
        {value:"title", text:"sort by title"},
        {value:"published", text:"sort by publish date"}
    ];

    $scope.sortOrder = $scope.sortOptions[0].value;

});