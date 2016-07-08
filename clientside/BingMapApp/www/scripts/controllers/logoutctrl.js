app.controller('logoutctrl', function ($scope, $http, Serviceurl) {
    $(document).ready(function(){
        var uid = window.localStorage.getItem("uid");
        var themecode = window.localStorage.getItem("themecode");
        $http.get(Serviceurl + "/changethemecode/" + themecode + "/" + uid + "/master")
            .success(function(response) {
                console.log("success");
                window.localStorage.clear();
                window.location.href = "../master.html";
            })
            .error(function(data, status) {
                console.log("err");

            });
    
        
    });
});