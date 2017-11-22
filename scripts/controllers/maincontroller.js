angular.module('myApp')
    .controller('MainCtrl', ['$scope', 'GitHub', '$interval', '$log', '$anchorScroll', '$location', ($scope, GitHub, $interval, $log, $anchorScroll, $location) => {

        const onUserComplete = function(data) {
            $scope.user = data;
            GitHub.getRepos($scope.user).then(onRepos, onError);
        };

        const onRepos = (data) => {
            $scope.repos = data;
            $location.hash("userDetails");
            $anchorScroll();
        };

        const onError = (reason) => {
            $scope.error = "Could not fetch the data.";
        };

        const decrementCountdown = () => {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        };

        let countdown = null;
        const startCountdown = () => {
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        }

        $scope.search = (username) => {
            $log.info("Searching for " + username);
            GitHub.getUser(username).then(onUserComplete, onError);
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
        };

        $scope.username = "";
        $scope.message = "GitHub Viewer";
        $scope.repoSortOrder = "-stargazers_count";
        $scope.countdown = 10;
        startCountdown();

    }]);