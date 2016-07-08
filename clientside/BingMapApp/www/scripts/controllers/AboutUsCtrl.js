app.controller('AboutUsCtrl', ['$scope', '$http', '$location', '$window', '$rootScope', 'Serviceurl', function ($scope, $http, $location, $window, $rootScope, Serviceurl) {
    var backpage = $location.absUrl();
    console.log(backpage);
    $scope.backtoPage = function () {
        $window.history.back();
    }
}]);