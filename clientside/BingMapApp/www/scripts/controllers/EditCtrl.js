$(document).ready(function () {
   
        $("#sidebar-wrapper").animate({ right: '0px' });
        $("#jumbo").css("display", "block");
        getNealCaffery();
   
});


function getNealCaffery() {
    var gender = window.localStorage.getItem("gender");
    var imageurl = window.localStorage.getItem("imageurl");
    if (imageurl === "NULL") {
        if (gender === "M") {
            document.getElementById("changedp").src = "../images/male.jpeg";
        } else if (gender === "F") {
            document.getElementById("changedp").src = "../images/female.jpg";
        } else {
            alert("Check gender");
        }
    }
    else {
        document.getElementById("changedp").src = imageurl;
    }
    var Neal = window.localStorage.getItem("myname");
    var Caffery = window.localStorage.getItem("email");
   // document.getElementById("Name").innerHTML = Neal;
    //document.getElementById("Email").innerHTML = Caffery;
}


app.controller('EditCtrl', ['$scope', '$http', '$location', '$window', '$rootScope', 'Serviceurl', function ($scope, $http, $location, $window, $rootScope, Serviceurl) {
    var backpage = $location.absUrl();
    var username = window.localStorage.getItem("myname");
    var email = window.localStorage.getItem("email");
    var uid = window.localStorage.getItem("uid");
    $scope.Username = username;
    $scope.Email = email;
    //var action = "http://localhost:1515/imgupload/" + uid;
    //$("#user_photo_form").attr("action", action);
  
    $scope.backtoPage = function () {
        $window.history.back();
    }

    $scope.changepwd = function() {
        $(".one").css('display', 'block');
        $("#savepic").css('display', 'none');
    }

    $scope.savepwd = function () {
        var password = window.localStorage.getItem("password");
        $scope.error = "";
        $scope.changed = "";
        document.getElementById('pwdChangeBtn').disabled = true;
        $('#pwdChangeBtn').html("Saving Changes...");
        var oldpwd = $("#oldpwd").val();
        if (password === oldpwd) {
            var newpwd = $("#newpwd").val();
            var connewpwd = $("#connewpwd").val();
            if (newpwd === connewpwd) {
                if (newpwd.length < 8) {
                    $scope.error = "Minimum length required is 8";
                    document.getElementById('pwdChangeBtn').disabled = false;
                    $('#pwdChangeBtn').html("Save Changes");
                } else {
                    $http.get(Serviceurl + "/changepwd/" + newpwd + "/" + uid + "/master")
                        .success(function (response) {
                            $scope.error = "";
                            $scope.changed = "Password udpated successfully";
                            window.localStorage.setItem("password", newpwd);
                            document.getElementById('pwdChangeBtn').disabled = false;
                            $('#pwdChangeBtn').html("Save Changes");
                            $(".one").css('display', 'none');
                        })
                .error(function (data, status) {
                    $scope.error = "Password change unsuccesful";
                    document.getElementById('pwdChangeBtn').disabled = false;
                    $('#pwdChangeBtn').html("Save Changes");
                });
                }
            }
            else {
                $scope.error = "New Password did not match";
                document.getElementById('pwdChangeBtn').disabled = false;
                $('#pwdChangeBtn').html("Save Changes");
            }
        }
        else {
            $scope.error = "Old Password not matched";
            document.getElementById('pwdChangeBtn').disabled = false;
            $('#pwdChangeBtn').html("Save Changes");
        }
        $("input[type='password']").val("");
    }

    //$scope.clickpic = function() {
    //    $("#savepic").css('display', 'block');
    //    $(".one").css('display', 'none');
    //    $scope.error = "";
    //    $scope.changed = "";
    //}

    //$scope.changepic = function() {
        
    //}
    //$scope.savepic = function () {
    //    $("#user_photo_form").submit();
    //}
}]);