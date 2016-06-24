
app.controller('accountscntrl', function ($scope, $http, Serviceurl) {
            //debugger
    var uid = window.localStorage.getItem("uid");

    document.getElementById("Loading").style.display = "block";
    $http.get(Serviceurl + "/getaccounts/" + uid)
    .success(function (response) {

        $scope.managers = response[0].accountslist;

        document.getElementById("Loading").style.display = "none";
    })
    .error();

    $scope.accountslistnames = function () {
        //console.log($scope.selection);
        window.localStorage.setItem("company",$scope.selection);
        window.location.href = "AccountTilesDisplay.html";

    }

    $scope.backtoPage = function () {
        window.location.href = "ManagersTiles.html";

    }

    $scope.selection = [];
    $scope.toggleSelection = function (dmname) {
        var idx = $scope.selection.indexOf(dmname);

        // is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
            document.getElementById('error').innerHTML = "";
        }

            // is newly selected
        else {
            if ($scope.selection.length < 4) {
                $scope.selection.push(dmname);
                document.getElementById('error').innerHTML = "";
            }
            else {
                document.getElementById('error').innerHTML = "You can select only four.";
            }
        }
    }    
});