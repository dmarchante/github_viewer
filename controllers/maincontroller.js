angular.module('myApp')
    .controller('MainCtrl', function($scope, $http) {

        const onUserComplete = function(response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };

        const onRepos = (response) => {
            $scope.repos = response.data;
        };

        const onError = (reason) => {
            $scope.error = "Could not fetch the data.";
        };

        $scope.search = (username) => {
            $http.get("https://api.github.com/users/" + username)
                .then(onUserComplete, onError);
        };

        $scope.username = "";
        $scope.message = "GitHub Viewer";
        $scope.repoSortOrder = "-stargazers_count";
    });