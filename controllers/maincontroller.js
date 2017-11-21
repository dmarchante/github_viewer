angular.module('myApp')
    .controller('MainCtrl', ['$scope', '$http', '$interval', '$log', '$anchorScroll', '$location', ($scope, $http, $interval, $log, $anchorScroll, $location) => {

        const onUserComplete = response => {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };



        const onRepos = (response) => {
            $scope.repos = response.data;
            $location.hash("userDetails");
            $anchorScroll();
        };

        // With GitHub Service Implemented
        /*
        const onUserComplete = function(data) {
            $scope.user = data;
            GitHbb.get($scope.user).then(onRepos, onError);
        };

        const onRepos = (data) => {
            $scope.repos = data;
            $location.hash("userDetails");
            $anchorScroll();
        };
        */

        const onError = (reason) => {
            $scope.error = "Could not fetch the data.";
        };

        $scope.search = (username) => {
            $log.info("Searching for " + username);
            $http.get("https://api.github.com/users/" + username)
                .then(onUserComplete, onError);
        };

        // With GitHub Service Implementation
        /*
        $scope.search = (username) => {
            $log.info("Searching for " + username);
            GitHub.get(username).then(onUserComplete, onError);

        */

        $scope.username = "";
        $scope.message = "GitHub Viewer";
        $scope.repoSortOrder = "-stargazers_count";
        //$scope.countdown = 10;
        //startCountdown();
    }]);