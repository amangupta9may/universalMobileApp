//open
app.controller('oppwonctrl', function ($scope, $http, Serviceurl) {
    //debugger;
    document.getElementById("Loading").style.display = "block";
    var uid = window.localStorage.getItem("uid");
    var location = window.localStorage.getItem("location");
    var accountManagerNames = window.localStorage.getItem("accountManagerNames");
    $http.get(Serviceurl + "/opportunitieswon/" + uid+"/"+location+"/"+accountManagerNames)
   .success(function (response) {
       //debugger;
      
       $scope.opportunitieswon = response;
       var onsite = 0;
       var offshore = 0;
       for (var i in response) {
           onsite += parseInt(response[i].OpportunityWonOnsite);
           offshore += parseInt(response[i].OpportunityWonOffshore);
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