$(document).ready(function () {
    $("#menu-toggle").click(function () {
        $("#sidebar-wrapper").animate({ right: '0px' }, { duration: 100 });
        $("#jumbo").css("display", "block");
        getNealCaffery();
    });
});

$(document).ready(function () {
    $("#jumbo").click(function () {
        $("#sidebar-wrapper").animate({ right: '-250px' }, { duration: 100});
        $("#jumbo").css("display", "none");
    });
});

$(document).ready(function () {
    $("#theme1").click(function () {
        window.localStorage.setItem("themecode", "0");
        changecolor();
    });
    $("#theme2").click(function () {
        window.localStorage.setItem("themecode", "1");
        changecolor();
    });
    $("#theme3").click(function () {
        window.localStorage.setItem("themecode", "2");
        changecolor();
    });
    $("#theme4").click(function () {
        window.localStorage.setItem("themecode", "3");
        changecolor();
    });
});

$(document).ready(function () {
    changecolor();
});

function changecolor() {
    var themecode = window.localStorage.getItem("themecode");
    if (themecode === "1") {
        $("#header").css("background-color", "#22264B");
        $("table thead tr th").css("background-color", "#22264B");
        $("body").css("background-color", "#B56969");
        $(".footer").css("background-color", "#B56969");
        $(".metro-tile").css("background-color", "#E6CF8B");
        $(".sidebar-nav li a").mouseover(function () {
            $(this).css("background-color", "#E6CF8B");
        });
        $(".sidebar-nav li a").mouseout(function () {
            $(this).css("background-color", "#B56969");
        });
        $("table tbody tr td").css("background-color", "#E6CF8B");
        $(".basiccolor1").css("background-color", "#22264B");
        $(".basiccolor2").css("background-color", "#B56969");
        $(".basiccolor3").css("background-color", "#E6CF8B");
    }
    else if (themecode === "2") {
        $("#header").css("background-color", "#5E0231");
        $("table thead tr th").css("background-color", "#5E0231");
        $("body").css("background-color", "#C7A693");
        $(".footer").css("background-color", "#C7A693");
        $(".metro-tile").css("background-color", "#DBC3D0");
        $(".sidebar-nav li a").mouseover(function () {
            $(this).css("background-color", "#DBC3D0");
        });
        $(".sidebar-nav li a").mouseout(function () {
            $(this).css("background-color", "#C7A693");
        });
        $("table tbody tr td").css("background-color", "#DBC3D0");
        $(".basiccolor1").css("background-color", "#5E0231");
        $(".basiccolor2").css("background-color", "#C7A693");
        $(".basiccolor3").css("background-color", "#DBC3D0");
    }
    else if (themecode === "3") {
        $("#header").css("background-color", "#312C32");
        $("table thead tr th").css("background-color", "#312C32");
        $("body").css("background-color", "#DAAD86");
        $(".footer").css("background-color", "#DAAD86");
        $(".metro-tile").css("background-color", "#98DAFC");
        $(".sidebar-nav li a").mouseover(function () {
            $(this).css("background-color", "#98DAFC");
        });
        $(".sidebar-nav li a").mouseout(function () {
            $(this).css("background-color", "#DAAD86");
        });
        $("table tbody tr td").css("background-color", "#98DAFC");
        $(".basiccolor1").css("background-color", "#312C32");
        $(".basiccolor2").css("background-color", "#DAAD86");
        $(".basiccolor3").css("background-color", "#98DAFC");
    }
    else {
        $("#header").css("background-color", "#06000A");
        $("table thead tr th").css("background-color", "#06000A");
        $("body").css("background-color", "#300032");
        $(".footer").css("background-color", "#300032");
        $(".metro-tile").css("background-color", "#C43235");
        $(".sidebar-nav li a").mouseover(function () {
            $(this).css("background-color", "#C43235");
        });
        $(".sidebar-nav li a").mouseout(function () {
            $(this).css("background-color", "#300032");
        });
        $("table tbody tr td").css("background-color", "#C43235");
        $(".basiccolor1").css("background-color", "#06000A");
        $(".basiccolor2").css("background-color", "#300032");
        $(".basiccolor3").css("background-color", "#C43235");
    }
}
//Important for last programmers, do not delete.
/*
$("#header").css("background-color", "#212121");
$("table thead tr th").css("background-color", "#212121");
$("body").css("background-color", "#303030");
$(".footer").css("background-color", "#303030");
$(".metro-tile").css("background-color", "#424242");
$(".sidebar-nav li a").mouseover(function () {
    $(this).css("background-color", "#424242");
});
$(".sidebar-nav li a").mouseout(function () {
    $(this).css("background-color", "#303030");
});
$("table tbody tr td").css("background-color", "#424242");
$(".basiccolor1").css("background-color", "#212121");
$(".basiccolor2").css("background-color", "#303030");
$(".basiccolor3").css("background-color", "#424242");
*/

function myFunction() {
    document.getElementById("jumbo").style.display = block;
}

var app = angular.module("myapp", []);
////http://exviewapp.azurewebsites.net/api ///http://localhost:1515/api
app.constant('Serviceurl', 'http://exviewapp.azurewebsites.net/api');

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

function getNealCaffery() {
    var gender = window.localStorage.getItem("gender");
    var imageurl = window.localStorage.getItem("imageurl");
    if (imageurl === "NULL") {
        if (gender === "M") {
            document.getElementById("dp").src = "../images/male.jpeg";
        } else if (gender === "F") {
            document.getElementById("dp").src = "../images/female.jpg";
        } else {
            alert("Check gender");
        }
    }
    else
    {
        document.getElementById("dp").src = imageurl;
    }
    var Neal = window.localStorage.getItem("myname");
    var Caffery = window.localStorage.getItem("email");
    document.getElementById("Name").innerHTML = Neal;
    document.getElementById("Email").innerHTML = Caffery;
}
