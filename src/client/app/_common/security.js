(function () {

    function interceptorsRegistry($httpProvider) {
        $httpProvider.interceptors.push(securityInterceptor);
    }

    function securityInterceptor($injector, $q, $rootScope, $localStorage) {
        function requestInterceptor(request) {
            request.headers['x-access-token'] = $localStorage.xAccessToken;
            return request || $q.when(request);
        };

        function responseErrorInterceptor(response) {
            var state = $injector.get('$state');
            if (response.status === 401) {
                state.go('login');
            }
            return $q.reject(response);
        };
        return {
            request: requestInterceptor,
            responseError: responseErrorInterceptor
        };
    }
    angular.module('template').config(interceptorsRegistry);
}());
