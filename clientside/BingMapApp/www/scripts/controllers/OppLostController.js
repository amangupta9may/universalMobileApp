
//open
app.controller('opplostctrl', function ($scope, $http, Serviceurl) {
    //debugger;
    document.getElementById("Loading").style.display = "block";
    var uid = window.localStorage.getItem("uid");
    var location = window.localStorage.getItem("location");
    var accountManagerNames = window.localStorage.getItem("accountManagerNames");
    $http.get(Serviceurl + "/opportunitieslost/" + uid + "/" + location + "/" + accountManagerNames)
   .success(function (response) {
       //debugger;
       $scope.opportunitieslost = response;
       var onsite = 0;
       var offshore = 0;
       for (var i in response) {
           onsite += parseInt(response[i].OpportunityLostOnsite);
           offshore += parseInt(response[i].OpportunityLostOffshore);
       }
       $scope.onsite = onsite;
       $scope.offshore = offshore;
       document.getElementById("Loading").style.display = "none";
   })
   .error();


    $scope.backtoPage = function () {
        window.location.href = "Accountmanagertiles.html";
    }
});