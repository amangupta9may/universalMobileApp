app.controller('ThemesCtrl', ['$scope', '$http', '$location', '$window', '$rootScope', 'Serviceurl',
function($scope, $http, $location, $window, $rootScope, Serviceurl) {
        $scope.backtoPage = function() {
            $window.history.back();
        }

        $scope.next1 = function () {
            $("#theme2").css('display', 'block');
            $("#theme1").css('display', 'none');
            $("#nextbutton1").css('display', 'none');
            $("#nextbutton2").css('display', 'block');
            $("#prevbutton1").css('display', 'block');
        }
        $scope.next2 = function () {
            $("#theme3").css('display', 'block');
            $("#theme2").css('display', 'none');
            $("#nextbutton2").css('display', 'none');
            $("#nextbutton3").css('display', 'block');
            $("#prevbutton2").css('display', 'block');
            $("#prevbutton1").css('display', 'none');
        }
        $scope.next3 = function () {
            $("#theme4").css('display', 'block');
            $("#theme3").css('display', 'none');
            $("#nextbutton3").css('display', 'none');
            $("#prevbutton3").css('display', 'block');
            $("#prevbutton2").css('display', 'none');
        }
        $scope.prev1 = function () {
            $("#theme1").css('display', 'block');
            $("#theme2").css('display', 'none');
            $("#nextbutton2").css('display', 'none');
            $("#nextbutton1").css('display', 'block');
            $("#prevbutton1").css('display', 'none');
        }
        $scope.prev2 = function () {
            $("#theme2").css('display', 'block');
            $("#theme3").css('display', 'none');
            $("#nextbutton3").css('display', 'none');
            $("#nextbutton2").css('display', 'block');
            $("#prevbutton1").css('display', 'block');
            $("#prevbutton2").css('display', 'none');
        }
        $scope.prev3 = function () {
            $("#theme3").css('display', 'block');
            $("#theme4").css('display', 'none');
            $("#nextbutton3").css('display', 'block');
            $("#prevbutton2").css('display', 'block');
            $("#prevbutton3").css('display', 'none');
        }
}]);

