var app = angular.module("TistoryApp", ['ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'ngAria',
    'ngMaterial'])

app.config(function ($httpProvider) {
    //console.log("?");
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.interceptors.push(function ($q, $rootScope, $window) {
        return {
            'request': function (config) {
                // intercepts the request
                console.log("req", JSON.stringify(config));
                //$('#spinnerView').show(); // <-- jquery로 인해 mddialog 에서 templateurl 요청시 undefined 에러가 났음

                $rootScope.$broadcast("spinner_show"); // <-- jquery가 안먹으니 directive를 이용하여 rootScope에 broadcast 하는 방식으로 변경
                return config || $q.when(config);
            },
            'requestError': function (rejection) {
                console.log("reqe", JSON.stringify(rejection))

                $rootScope.$broadcast("spinner_hide");
                return $q.reject(rejection);
            },
            'response': function (response) {
                // intercepts the response. you can examine things like status codes
                console.log("res", JSON.stringify(response));
                //$('#spinnerView').hide();

                $rootScope.$broadcast("spinner_hide");
                return response || $q.when(response);
            },
            'responseError': function (response) {
                // intercepts the response when the response was an error
                console.log("rese", JSON.stringify(response));
                //$('#spinnerView').hide();
                $rootScope.$broadcast("spinner_hide");
                return $q.reject(response);
            }
        };
    });
});

app.directive("spinner", function ($rootScope) {
    return function ($scope, element, attrs) {
        $scope.$on("spinner_show", function () {
            return element.show();
        })
        return $scope.$on("spinner_hide", function () {
            return element.hide();
        })
    }
})

app.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});