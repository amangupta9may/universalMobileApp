app.controller('tilescntrl', function ($scope, $http, Serviceurl) {

    $('.bxslider').bxSlider({
        minSlides: 1,
        maxSlides: 1,
        //slideWidth: 100,
        slideWidth: 1000,
        adaptiveHeight: true,
        ticker: true,
        speed: 42000
    });
    document.getElementById("Loading").style.display = "block";
    var uid = window.localStorage.getItem("uid");

    var screennum = "screen2";
    $http.get(Serviceurl + "/gettiles/" + screennum + "/" + uid)
    .success(function (response) {
        $scope.tilesnames = response[0].tiles;
        document.getElementById("Loading").style.display = "none";
    })
    .error();

    $scope.listofaccounts = function () {
        window.location.href = "ListofAccounts.html";
    }
    $scope.listofDMtiles = function () {
        ////debugger;
        loadDMS();
    }

    function loadDMS() {
        window.location.href = "ListofDMs.html";
    }

    $scope.listofAccountManagers = function () {
        ////debugger;
        window.location.href = "ListofAccountsManger.html";
    }

    $scope.backtoPage = function () {
        window.location.href = "maps.html";
    }
});