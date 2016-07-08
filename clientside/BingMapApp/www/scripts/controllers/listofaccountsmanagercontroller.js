app.controller('listofaccountsmanagerCntrl', function ($scope, $http, Serviceurl) {

    document.getElementById("Loading").style.display = "block";
    $scope.accountmanagerlistnames = function () {
        window.localStorage.setItem("accountManagerNames", $scope.selection);
        window.location.href = "Accountmanagertiles.html";
    }

    var uid = window.localStorage.getItem("uid");
    $http.get(Serviceurl + "/getaccountmanagers/" + uid)
    .success(function (response) {
        $scope.managers = response[0].accountmanagerlist;

        document.getElementById("Loading").style.display = "none";
    })
    .error();

    $scope.selection = [];
    $scope.clearall = function () {
        var length = $scope.selection.length;
        for (var i = 0; i < length; i++) {
            $scope.selection.splice(0, 1);
        }

    }

    $scope.toggleSelection = function (dmname) {
        var idx = $scope.selection.indexOf(dmname);

        // is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }

            // is newly selected
        else {
            $scope.selection.push(dmname);
        }
    }

    $scope.selectallfunc = function () {
        for (var i = 0; i < $scope.managers.length; i++) {
            $scope.selection.push($scope.managers[i]);
        }
       
    }
    $scope.backtoPage = function () {
        window.location.href = "ManagersTiles.html";
    }
});