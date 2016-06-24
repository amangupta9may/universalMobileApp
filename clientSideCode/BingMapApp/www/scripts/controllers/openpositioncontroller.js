


//open
app.controller('openpositionctrl', function ($scope, $http, Serviceurl) {
    //debugger;
    document.getElementById("Loading").style.display = "block";
    var uid = window.localStorage.getItem("uid");
    var location = window.localStorage.getItem("location");
    var company = window.localStorage.getItem("company");
    $http.get(Serviceurl + "/getopportunity/" + uid+"/"+location+"/"+company)
   .success(function (response) {
       //debugger;
       $scope.onsite = 0;
       $scope.offshore = 0;
       $scope.openPositions = [];
       for (var i in response) {
           for (var j in response[i].data) {
               $scope.openPositions.push(response[i].data[j]);
               //console.log(response[i].data[j]);
           }
         $scope.onsite += parseInt(response[i].onsite);
         $scope.offshore += parseInt(response[i].offshore);
         document.getElementById("Loading").style.display = "none";
   }
   })
   .error();


    $scope.backtoPage = function () {
        window.location.href = "AccountTilesDisplay.html";
    }
});