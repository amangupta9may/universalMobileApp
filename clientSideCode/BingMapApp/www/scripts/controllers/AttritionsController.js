// JavaScript source code
app.controller('attrictrl', function ($scope, $http, Serviceurl) {

    document.getElementById("Loading").style.display = "block";
    var uid = window.localStorage.getItem("uid");
    var locations = window.localStorage.getItem("location");
    var company = window.localStorage.getItem("company");
    $http.get(Serviceurl + "/getattritions/" + uid+"/"+locations+"/"+company)
   .success(function (response) {
       //debugger;
       $scope.attritions = [];
      
       for (var i in response) {
           for (var j in response[i].data) {
               $scope.attritions.push(response[i].data[j]);
               console.log(response[i].data[j]);
           }
       }

       document.getElementById("Loading").style.display = "none";
   })
   .error();

    $scope.backtoPage = function () {
        window.location.href = "AccountTilesDisplay.html";
    }
});