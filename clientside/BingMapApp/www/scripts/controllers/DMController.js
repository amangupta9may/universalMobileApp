app.controller('DMCntrl', function ($scope, $http, Serviceurl) {
    $('.bxslider').bxSlider({
        minSlides: 1,
        maxSlides: 1,
        //slideWidth: 100, 
        //adaptiveHeight: true,
        slideWidth: 1000,
        ticker: true,
        speed: 42000
    });

    $scope.openWon = function () {
        window.location.href = "DMOppWon.html";
    }

    $scope.openLost = function () {
        window.location.href = "DMOppLost.html";
    }

    $scope.openProg = function () {
        window.location.href = "DMOppProg.html";
    }

    $scope.openLeads = function () {
        window.location.href = "DMLeads.html";
    }
    $scope.backtoPage = function () {
        window.location.href = "ListofDMs.html";
    }
});