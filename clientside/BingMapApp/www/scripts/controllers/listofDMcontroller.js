app.controller('listofDMCntrl', ['$scope', '$http', '$rootScope', 'Serviceurl', function ($scope, $http, $rootScope, Serviceurl) {
    //code 
    // $scope.managers = managersData;
    //debugger;
    document.getElementById("Loading").style.display = "block";
    window.localStorage.setItem("reqchmDM", "");
    window.localStorage.setItem("reqchmDataFor", "");

    var uid = window.localStorage.getItem("uid");
   
    $http.get(Serviceurl + "/getdeliverymanagers/" + uid)
    .success(function (response) {
        $scope.managers = response[0].deliverymanagerlist;
        document.getElementById("Loading").style.display = "none";
    })
    .error(function (data, status) {
        document.getElementById("Loading").style.display = "none";
    });

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

    $rootScope.dmlistnames = function () {
            //  $rootScope.$broadcast("Update", $scope.selection);
            // $rootScope.selectedvalues = $scope.selection;
           
            window.localStorage.setItem("SelectedDMList", $scope.selection);
            window.localStorage.setItem("reqchmDM", $scope.selection[0]);
            window.localStorage.setItem("reqchmDataFor", "dm");
            window.localStorage.setItem("DeliveryManagerNames", $scope.selection);
            window.location.href = "DeliveryManagerTiles.html";
        }

    $scope.backtoPage = function () {
        window.location.href = "ManagersTiles.html";
    }
}]);