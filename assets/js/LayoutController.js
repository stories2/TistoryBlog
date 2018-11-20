app.controller("LayoutController", function ($scope, $http, $mdToast, $mdSidenav, $window, TistoryAppService) {
    TistoryAppService.printLogMessage("LayoutController", "LayoutController", "init", LOG_LEVEL_INFO);

    $scope.title = "Hello World!"
    $scope.toggleLeft = buildToggler('left');

    $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
            .then(function () {
                TistoryAppService.printLogMessage("NavigationController", "NavigationController", "close LEFT is done", LOG_LEVEL_INFO)
            });
    }

    function buildToggler(navID) {
        return function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    TistoryAppService.printLogMessage("NavigationController", "NavigationController", "toggle " + navID + " is done", LOG_LEVEL_DEBUG)
                });
        };
    }
})