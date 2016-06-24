//open
app.controller('mapsctrl', function ($scope, $http, Serviceurl) {
    //debugger;
    var uid = window.localStorage.getItem("uid");
    var locations = [];
    var centerLat = 0;
    var centerLong = 0;
    var length = 0;
    document.getElementById("Loading").style.display = "block";
    $scope.location = function () {
       
        if (length !== 0) { centerLat = centerLat/length; centerLong = centerLong/length; }
        //console.log(length + " " + centerLat + " " + centerLong);
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 5,
            center: new google.maps.LatLng(centerLat, centerLong),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;
       
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map
            });

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    //set content and add color on basis of the progress in projects
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                    window.localStorage.setItem("location", locations[i][0]);
                    window.location.href = "ManagersTiles.html";
                } 
            })(marker, i));
        }
        document.getElementById("Loading").style.display = "none";

    };

    $scope.mapToNext = function (city) {
        city = "'" + city + "'";
        window.localStorage.setItem("location", city);
        window.location.href = "ManagersTiles.html";
    }

    $http.get(Serviceurl + "/getlocations/" + uid)
   .success(function (response) {
       //debugger;
       var mapsLocation = response[0].locations;
       $scope.locations = mapsLocation;
       //console.log(mapsLocation[0].country);
       //console.log('mapslocation '+mapsLocation);
       length = mapsLocation.length;
       for (var i in mapsLocation) {
           var tempLat = mapsLocation[i].lat;
           var tempLong = mapsLocation[i].long;
           var temp = ["'"+mapsLocation[i].city+"'",tempLat,tempLong,i];
           locations[i] = temp;
           centerLat += parseFloat(tempLat);
           centerLong += parseFloat(tempLong);
           //console.log(location1);

       }
      
       $scope.location();
       
   })
   .error();
   
});