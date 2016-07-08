// JavaScript source code
app.controller('dmoppprogctrl', function ($scope, $http, Serviceurl) {
    //debugger;
    document.getElementById("Loading").style.display = "block";
    var uid = window.localStorage.getItem("uid");
    var location = window.localStorage.getItem("location");
    var DeliveryManagerNames = window.localStorage.getItem("DeliveryManagerNames");
    $http.get(Serviceurl + "/dmopportunitiesinprogress/" + uid +"/"+ location + "/" + DeliveryManagerNames)
   .success(function (response) {
       //debugger;
       $scope.dmopportunitiesinprogress = response;
       document.getElementById("Loading").style.display = "none";
   })
   .error();


    $scope.backtoPage = function () {
        window.location.href = "DeliveryManagerTiles.html";
    }
});