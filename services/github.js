angular.module('myApp')
    .service('GitHub', [$http => {
        const getUser = (username) => {
            return $http.get("https://api.github.com/users/" + username)
                .then(response => {
                    return response.data;
                });
        };

        const getRepos = (user) => {
            $http.get(user.repos_url)
                .then(response => {
                    return response.data;
                });

            return {
                getUser: getUser,
                getRepos: getRepos
            };
        }
    }]);