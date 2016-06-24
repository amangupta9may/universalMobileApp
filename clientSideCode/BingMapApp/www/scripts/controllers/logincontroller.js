//Angular Part
app.controller('logincntrl', function ($scope, $http, Serviceurl) {
    $scope.authenticated = false;
    $scope.type = 'master';
    $scope.login = function () {
        var emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if ($scope.email != undefined) {
            if (emailReg.test($scope.email)) {
                var email = $scope.email;
                var pass = $scope.password;
                document.getElementById("Loading").style.display = "block";
                if (email != "" && pass != "" && email != undefined && pass != undefined) {
                    try {
                        $http.get(Serviceurl + "/authenticate/" + email + "/" + pass + "/" + $scope.type)
                        .success(function (response) {
                            var data = JSON.stringify(response);
                            var result = JSON.parse(data);                         
                            if (result.length > 0) {
                             
                                var uid = result[0].uid;
                                var myname = result[0].myname;
                                var username = result[0].username;
                                var gender = result[0].gender;
                                window.localStorage.setItem("gender", gender);
                                window.localStorage.setItem("uid", uid);
                                window.localStorage.setItem("myname", myname);
                                window.localStorage.setItem("email", username);
                                
                                window.location.href = "Views/maps.html";
                            }
                            else {
                                document.getElementById("Loading").style.display = "none";
                                $scope.error = 'Email or Password is Wrong';
                                document.getElementById("email").value = "";
                                document.getElementById("password").value = "";
                            }
                        })
                        .error(function (data, status) {
                            document.getElementById("Loading").style.display = "none";
                            
                        });
                    }
                    catch (e) {
                        document.getElementById("Loading").style.display = "none";
                    }

                }
                else { document.getElementById("Loading").style.display = "none"; }
            } else {
                $scope.error = 'Invalid Email address';
                document.getElementById("Loading").style.display = "none";
            }
        }
    }
});