angular.module('myApp')
    .controller('MainCtrl', ['$scope', '$http', '$interval', '$log', '$anchorScroll', '$location', ($scope, $http, $interval, $log, $anchorScroll, $location) => {

        const onUserComplete = function(response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };

        const onRepos = (response) => {
            $scope.repos = response.data;
            $location.hash("userDetails");
            $anchorScroll();
        };

        const onError = (reason) => {
            $scope.error = "Could not fetch the data.";
        };

        /*const decrementCountdown = () => {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        };

        let countdownInterval = null;
        const startCountdown = () => {
            coutndownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        }*/

        $scope.search = (username) => {
            $log.info("Searching for " + username);
            $http.get("https://api.github.com/users/" + username)
                .then(onUserComplete, onError);
            /*if (countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }*/
        };

        $scope.username = "";
        $scope.message = "GitHub Viewer";
        $scope.repoSortOrder = "-stargazers_count";
        //$scope.countdown = 10;
        //startCountdown();
    }]);