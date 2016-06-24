$(document).ready(function () {
    $("#menu-toggle").click(function () {
        $("#sidebar-wrapper").animate({ right: '0px' });
        $("#jumbo").css("display", "block");
        getNealCaffery();
    });
});

$(document).ready(function () {
    $("#jumbo").click(function () {
        $("#sidebar-wrapper").animate({ right: '-250px' });
        $("#jumbo").css("display", "none");
    });
});

function myFunction() {
    document.getElementById("jumbo").style.display = block;
}

var app = angular.module("myapp", []);

app.constant('Serviceurl', 'http://localhost:1515/api');

function getCurrentMonthAndYear()
{
    //debugger;
    var d = new Date();
    var year=d.getFullYear();
    var month = d.getMonth() + 1;
    if (month < 10)
    {
        month = "0" + month;
    }
    return year+"-"+month;
}

function getUrlParameter(param, dummyPath) {
    //debugger;
    var sPageURL = dummyPath || window.location.search.substring(1),
        sURLVariables = sPageURL.split(/[&||?]/),
        res;

    for (var i = 0; i < sURLVariables.length; i += 1) {
        var paramName = sURLVariables[i],
            sParameterName = (paramName || '').split('=');

        if (sParameterName[0] === param) {
            res = sParameterName[1];
        }
    }

    return res;
}

function getMonth(graphdate) {
    var months = {
        en: {
            "jan": 0,
            "feb": 1,
            "mar": 2,
            "apr": 3,
            "may": 4,
            "jun": 5,
            "jul": 6,
            "aug": 7,
            "sep": 8,
            "oct": 9,
            "nov": 10,
            "dec": 11
        }
    };

    var dt = new Date(
        parseInt(graphdate.substring(7), 12),               // year
        months.en[graphdate.substring(3, 6).toLowerCase()], // month
        parseInt(graphdate.substring(0, 2), 12)             // day
    );
    return dt.getMonth() + 1;
}

//app.directive('sideBar', function(){
//    return {
//        restrict: 'E',
//        templateUrl: 'Views/side-bar.html',
//        link: function (scope, element, attribute) {
//            $(document).ready(function () {
//                $("#menu-toggle").click(function () {
//                    $("#sidebar-wrapper").animate({ right: '0px' });
//                });
//            });

//            $(document).ready(function () {
//                $(".container, .footer, #menu-toggle2").click(function () {
//                    $("#sidebar-wrapper").animate({ right: '-250px' });
//                });
//            });

//        }
//    };
// });


function getNealCaffery() {
    var gender = window.localStorage.getItem("gender");
    if (gender === "M")
    {
        document.getElementById("dp").src = "../images/male.jpeg";
    }
    else if (gender === "F") {
        document.getElementById("dp").src = "../images/female.jpg";
    }
    else {
        alert("Check gender");
    }
    var Neal = window.localStorage.getItem("myname");
    var Caffery = window.localStorage.getItem("email");
    document.getElementById("Name").innerHTML = Neal;
    document.getElementById("Email").innerHTML = Caffery;
}
