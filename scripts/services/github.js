angular.module('myApp')
    .service('GitHub', ['$http', $http => {
        var getUser = (username) => {
            console.log($http);
            return $http.get("https://api.github.com/users/" + username)
                .then(response => {
                    return response.data;
                });
        };

        var getRepos = (user) => {
            return $http.get(user.repos_url)
                .then(response => {
                    return response.data;
                });
        };
        return {
            getUser: getUser,
            getRepos: getRepos
        };
    }]);