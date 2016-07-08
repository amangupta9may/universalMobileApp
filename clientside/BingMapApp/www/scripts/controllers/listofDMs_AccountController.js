app.controller('listofDMCntrl', ['$scope', '$http','$location','$rootScope', 'Serviceurl', function ($scope, $http,$location,$rootScope, Serviceurl) {
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

    $rootScope.dmlistnames = function () {
        
            //  $rootScope.$broadcast("Update", $scope.selection);
            // $rootScope.selectedvalues = $scope.selection;
          
            window.localStorage.setItem("SelectedDMList_Account", $scope.selection);
            window.localStorage.setItem("reqchmDM", $scope.selection[0]);
            window.localStorage.setItem("reqchmDataFor", "dm");
         
            var tile = getUrlParameter("tile", $location.absUrl());
            switch (tile) {
                case "cod": window.location.href = "costofdelivery.html";
                    break;
                case "chm": window.location.href = "CHMParameters.html";
                    break;
                case "csat": window.location.href = "customersatisfaction.html";
                    break;
                default: window.location.href = "#";

            }
        }

    $scope.backtoPage = function () {
        window.location.href = "AccountTilesDisplay.html";
    }
}]);