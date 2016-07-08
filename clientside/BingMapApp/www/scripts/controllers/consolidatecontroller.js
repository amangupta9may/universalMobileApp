app.controller('consolidatecntrl', function ($scope, $http, $location, Serviceurl) {
    //code 
   // debugger;
    $scope.pcsattable = true;
    var uid = window.localStorage.getItem("uid");
    var DMName = window.localStorage.getItem("reqchmDM");

    $scope.backtoPage = function () {
        //debugger;
        window.location.href = "AccountTilesDisplay.html";
    }

    function getCurrentQuater() {
        var d = new Date();
        var q = [4, 1, 2, 3];
        var cq = q[Math.floor(d.getMonth() / 3)];
        return cq;
    }

    function getMonthAndYearBasedOnQuater(currentQuater, type) {
        //debugger;
        var months = [];
        var years = [];
        var monthAndYear = {};

        if (type == "current") {
            if (currentQuater == 4) {
                months.push(01, 02, 03);
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 3) {
                months.push(10, 11, 12);
                var d = new Date();
                years.push(d.getFullYear() + 1);
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 2) {
                months.push(07, 08, 09);
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 1) {
                months.push(04, 05, 07);
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
        }
        if (type == "next") {
            if (currentQuater == 4) {
                months.push(04, 05, 06);
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 3) {
                months.push(01, 02, 03);
                var d = new Date();
                years.push(d.getFullYear() + 1);
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 2) {
                months.push(10, 11, 12);
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 1) {
                months.push(07, 08, 09);
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
        }

        if (type == "previous") {
            if (currentQuater == 4) {
                months.push(10, 11, 12);
                var d = new Date();
                years.push(d.getFullYear() - 1);
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 3) {
                months.push(07, 08, 09);
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 2) {
                months.push(04, 05, 06);
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 1) {
                months.push(01, 02, 03);
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
        }

        if (type == "lasttwoquaters") {
            if (currentQuater == 4) {
                months.push(07, 08, 09, 10, 11, 12);
                var d = new Date();
                years.push(d.getFullYear() - 1);
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 3) {
                months.push(04, 05, 06, 07, 08, 09);
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 2) {
                months.push(01, 02, 03, 04, 05, 06);
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 1) {
                months.push(10, 11, 12, 01, 02, 03);
                var d = new Date();
                years.push(d.getFullYear() - 1, d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
        }

        return monthAndYear;
    }

    var currentQuater = getCurrentQuater();
    var dates = getMonthAndYearBasedOnQuater(currentQuater, "current");
    var month;

    /*
    var url = Serviceurl + "/getconsolidateddata/revenuechart/chmchart/";
    for (var i = 0; i < dates.months.length; i++) {
        if (dates.months[i] < 10) {
            month = "0" + dates.months[i];
        } else
            month = dates.months[i];

        url += dates.years[0] + "-" + month + "/";
    }
    

    dates = getMonthAndYearBasedOnQuater(currentQuater, "previous");
    for (var i = 0; i < dates.months.length; i++) {
        if (dates.months[i] < 10) {
            month = "0" + dates.months[i];
        } else
            month = dates.months[i];

        url += dates.years[0] + "-" + month + "/";
    }
    url += uid + "/" + DMName;
    // Current Qtr 
    $http.get(url)
    .success(function (response) {
        //debugger;
        // console.log(response);
        //debugger;
        $scope.data = response;
    })
   .error(function (data, status) {
       console.log(data);
   });
   */

});