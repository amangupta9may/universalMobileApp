
app.controller('revenuecntrl', function ($scope, $http, $location, Serviceurl)
{
    document.getElementById("Loading").style.display = "block";

    //global variables
    var TTbarchartfillcolor = "rgba(149,26,10,0.75)",
        TTbarchartstrokeColor = "rgba(149,26,10,0.8)",
        TTbarcharthighlightFill = "rgba(149,26,10,5)",
        TTbarcharthighlightStroke = "rgba(149,26,10,1)";
    var ATbarchartfillcolor = "rgba(89,171,86,0.75)",
        ATbarchartstrokeColor = "rgba(89,171,86,0.8)",
        ATbarcharthighlightFill = "rgba(89,171,86,5)",
        ATbarcharthighlightStroke = "rgba(89,171,86,1)";


    function getListMonthNames(type) {
        //debugger;
        var currentQuater = getCurrentQuater();
        var label = [];
        //
        if (type == "current") {
            if (currentQuater == 4) {
                label.push("jan", "feb", "mar");
                return label;
            }
            if (currentQuater == 3) {
                label.push("oct", "nov", "dec");
                return label;
            }
            if (currentQuater == 2) {
                label.push("jul", "aug", "sep");
                return label;
            }
            if (currentQuater == 1) {
                label.push("apr", "may", "jun");
                return label;
            }
        }
        if (type == "next") {
            if (currentQuater == 4) {
                label.push("apr", "may", "jun");
                return label;
            }
            if (currentQuater == 3) {
                label.push("jan", "feb", "jun");
                return label;
            }
            if (currentQuater == 2) {
                label.push("oct", "nov", "dec");
                return label;
            }
            if (currentQuater == 1) {
                label.push("jul", "aug", "sep");
                return label;
            }
        }

        if (type == "previous") {
            if (currentQuater == 4) {
                label.push("oct", "nov", "dec");
                return label;
            }
            if (currentQuater == 3) {
                label.push("jul", "aug", "sep");
                return label;
            }
            if (currentQuater == 2) {
                label.push("apr", "may", "jun");
                return label;
            }
            if (currentQuater == 1) {
                label.push("jan", "feb", "mar");
                return label;
            }
        }

        if (type == "lasttwoquaters") {
            if (currentQuater == 4) {

                label.push("jul", "aug", "sep", "oct", "nov", "dec");
                return label;
            }
            if (currentQuater == 3) {
                label.push("apr", "may", "jun", "jul", "aug", "sep");
                return label;

            }
            if (currentQuater == 2) {

                label.push("jan", "feb", "mar", "apr", "may", "jun");
                return label;
            }
            if (currentQuater == 1) {

                label.push("oct", "nov", "dec", "jan", "feb", "mar");
                return label;

            }
        }


    }
    
    function DataBind(data) {
        //debugger;

        console.log(data);
        console.log(data[0].apr);
        
        var month = getListMonthNames("current");
        console.log(month);
        console.log(month[0]);
        console.log(data[0][month[0]]);
        var month1, month2, month3;
        for (var i = 0; i < data.length; i++) {

            month1 = data[i][month[0]];
            month2 = data[i][month[1]];
            month3 = data[i][month[2]];

            var q4 = data[i].total;
            var name = "canvas" + (i + 1);
            var tabHeader = "#tabheader" + (i + 1);
            var totalAmount = "#totalamount" + (i + 1);
            var spantotalRevenue = "#TotalRevenue" + (i + 1);
            var spnTotalRevenue = $(spantotalRevenue);
            spnTotalRevenue.html('Actual Revenue');
            var ctx = document.getElementById(name).getContext("2d");
            ctx.canvas.width = "300";
            ctx.canvas.height = "300";

            var tabHeaderr = $(tabHeader);
            var totalRevenue = $(totalAmount);
            totalRevenue.html('$' + q4);

            tabHeaderr.html(data[i].Company);
            var barChartData = {
                labels: [month[0], month[1], month[2]],
                datasets: []
            }
            var datasetobj = {
                label: data[i].Company,
                fillColor: ATbarchartfillcolor,
                strokeColor: ATbarchartstrokeColor,
                highlightFill: ATbarcharthighlightFill,
                highlightStroke: ATbarcharthighlightStroke,
                data: [month1, month2, month3]
            }

            barChartData.datasets = [];
            barChartData.datasets.push(datasetobj);

            window.myBar = new Chart(ctx).Bar(barChartData);

        }
        document.getElementById("Loading").style.display = "none";
    }

    function next(data) {

        var month = getListMonthNames("next");
        var month1, month2, month3;
        for (var i = 0; i <data.length; i++) {
            ////debugger;

            month1 = data[i][month[0]];
            month2 = data[i][month[1]]
            month3 = data[i][month[2]];

            var q4 = data[i].total;
            var name = "canvas" + (i + 1);
            var tabHeader = "#tabheader" + (i + 1);
            var totalAmount = "#totalamount" + (i + 1);
            var spantotalRevenue = "#TotalRevenue" + (i + 1);
            var ctx = document.getElementById(name).getContext("2d");
            ctx.canvas.width = "300";
            ctx.canvas.height = "300";

            var tabHeaderr = $(tabHeader);
            var spnTotalRevenue = $(spantotalRevenue);
            spnTotalRevenue.html('Projected Revenue');
            var totalRevenue = $(totalAmount);
            totalRevenue.html('$'+q4);

            tabHeaderr.html(data[i].Company);
            var barChartData = {
                labels: [month[0], month[1], month[2]],
                datasets: []
            }
            var datasetobj = {
                label: data[i].Company,
                fillColor: ATbarchartfillcolor,
                strokeColor: ATbarchartstrokeColor,
                highlightFill: ATbarcharthighlightFill,
                highlightStroke: ATbarcharthighlightStroke,
                data: [month1, month2, month3]
            }
            barChartData.datasets = [];
            barChartData.datasets.push(datasetobj);
            window.myBar = new Chart(ctx).Bar(barChartData, {
                responsive: false
            });

        }
    }

    function previous(data) {
        var month = getListMonthNames("previous");
        var month1, month2, month3;

        for (var i = 0; i < data.length; i++) {

            month1 = data[i][month[0]];
            month2 = data[i][month[1]]
            month3 = data[i][month[2]];

            var q4 = data[i].total;
            var name = "canvas" + (i + 1);
            var tabHeader = "#tabheader" + (i + 1);
            var totalAmount = "#totalamount" + (i + 1);
            var spantotalRevenue = "#TotalRevenue" + (i + 1);
            var spnTotalRevenue = $(spantotalRevenue);
            spnTotalRevenue.html('Actual Revenue');

            var ctx = document.getElementById(name).getContext("2d");
            ctx.canvas.width = "300";
            ctx.canvas.height = "300";

            var tabHeaderr = $(tabHeader);
            var totalRevenue = $(totalAmount);
            totalRevenue.html('$'+q4);

            tabHeaderr.html(data[i].Company);
            var barChartData = {
                labels: [month[0], month[1], month[2]],
                datasets: []
            }
            var datasetobj = {
                label: data[i].Company,
                fillColor: ATbarchartfillcolor,
                strokeColor: ATbarchartstrokeColor,
                highlightFill: ATbarcharthighlightFill,
                highlightStroke: ATbarcharthighlightStroke,
                data: [month1, month2, month2]
            }
            barChartData.datasets = [];
            barChartData.datasets.push(datasetobj);
            window.myBar = new Chart(ctx).Bar(barChartData, {
                responsive: false
            });

        }
    }

    function lasttwoquaters(data) {
        //debugger;
        var month = getListMonthNames("lasttwoquaters");
        var month1, month2, month3, month4, month5, month6;

        for (var i = 0; i < data.length; i++) {

            var jul, aug, sep, oct, nov, dec, q4;

            month1 = data[i][month[0]];
            month2 = data[i][month[1]]
            month3 = data[i][month[2]];
            month4 = data[i][month[3]];
            month5 = data[i][month[4]];
            month6 = data[i][month[5]];

            var name = "canvas" + (i + 1);
            var tabHeader = "#tabheader" + (i + 1);
            var spantotalRevenue = "#TotalRevenue" + (i + 1);
            var spnTotalRevenue = $(spantotalRevenue);
            spnTotalRevenue.html('Actual Revenue');

            var ctx = document.getElementById(name).getContext("2d");
            ctx.canvas.width = "300";
            ctx.canvas.height = "300";

            var tabHeaderr = $(tabHeader);

            tabHeaderr.html(data[i].Company);
            var barChartData = {
                labels: [month[0], month[1], month[2], month[3], month[4], month[5]],
                datasets: []
            }
            var datasetobj = {
                label: data[i].Company,
                fillColor: ATbarchartfillcolor,
                strokeColor: ATbarchartstrokeColor,
                highlightFill: ATbarcharthighlightFill,
                highlightStroke: ATbarcharthighlightStroke,
                data: [month1, month2, month3, month4, month5, month6]
            }
            barChartData.datasets = [];
            barChartData.datasets.push(datasetobj);
            window.myBar = new Chart(ctx).Bar(barChartData, {
                responsive: false
            });

        }
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
                years.push(d.getFullYear());
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
                months.push(04, 05, 06);
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

    var uid = window.localStorage.getItem("uid");

    $scope.backtoPage = function () {
        window.location.href = "AccountTilesDisplay.html";
    }
    var listofcompany = window.localStorage.getItem("company");//getUrlParameter("listofdeliverynames", $location.absUrl());
    var location = window.localStorage.getItem("location");

    $scope.obj = listofcompany;

    var monthYear = getCurrentMonthAndYear();
    var type = "revenuechart";

    var currentQuater = getCurrentQuater();
    var dates = getMonthAndYearBasedOnQuater(currentQuater, "current");
    var month;

    var url = Serviceurl + "/getrevenue/";
    for (var i = 0; i < dates.months.length; i++) {
        if (dates.months[i] < 10) {
            month = "0" + dates.months[i];
        } else
            month = dates.months[i];

        url += dates.years[0] + "-" + month + "/";
    }

    url += type + "/" + uid + "/" + location+"/"+listofcompany;

    $http.get(url)
        .success(function (data) {
           
            DataBind(data);
          
        })
    .error();


    $scope.firstQ = function () {

        var currentQuater = getCurrentQuater();
        var dates = getMonthAndYearBasedOnQuater(currentQuater, "current");
        var month;

        var url = Serviceurl + "/getrevenue/";
        for (var i = 0; i < dates.months.length; i++) {
            if (dates.months[i] < 10) {
                month = "0" + dates.months[i];
            } else
                month = dates.months[i];

            url += dates.years[0] + "-" + month + "/";
        }
   
        url += type + "/" + uid + "/" + location + "/" + listofcompany;
        $http.get(url)
       .success(function (data) {
           DataBind(data);
       })
   .error();
    }

    //next
    $scope.secondQ = function () {
        //debugger;
        var currentQuater = getCurrentQuater();
        var dates = getMonthAndYearBasedOnQuater(currentQuater, "next");
        var month;

        //var requiredDate = dates.years[0] + "-" + month;
        var url = Serviceurl + "/getrevenue/";
        for (var i = 0; i < dates.months.length; i++) {
            if (dates.months[i] < 10) {
                month = "0" + dates.months[i];
            } else
                month = dates.months[i];

            url += dates.years[0] + "-" + month + "/";
        }
      
        url += type + "/" + uid + "/" + location + "/" + listofcompany;
        $http.get(url)
       .success(function (data) {
           next(data);
       })
  .error();
    }

    //previous
    $scope.thirdQ = function () {
        //debugger;
        var currentQuater = getCurrentQuater();
        var dates = getMonthAndYearBasedOnQuater(currentQuater, "previous");
        var month;
        var url = Serviceurl + "/getrevenue/";
        for (var i = 0; i < dates.months.length; i++) {
            if (dates.months[i] < 10) {
                month = "0" + dates.months[i];
            } else
                month = dates.months[i];

            url += dates.years[0] + "-" + month + "/";
        }
        
        url += type + "/" + uid + "/" + location + "/" + listofcompany;

        $http.get(url)
          .success(function (data) {
              previous(data);
          })
      .error();
    }

    //last2q
    $scope.fourthQ = function () {
        //debugger;
        var currentQuater = getCurrentQuater();
        var dates = getMonthAndYearBasedOnQuater(currentQuater, "lasttwoquaters");
        var month;
        var jsonData = [];
        var url = Serviceurl + "/getrevenue/";
        for (var i = 0; i < dates.months.length - 3; i++) {
            if (dates.months[i] < 10) {
                month = "0" + dates.months[i];
            } else
                month = dates.months[i];

            url += dates.years[0] + "-" + month + "/";
        }
        url += type + "/" + uid + "/" + location + "/" + listofcompany;

        $http.get(url)
       .success(function (data) {
           //debugger;
           for (var i = 0; i < data.length; i++) {
               jsonData.push(data[i]);
           }
           url = Serviceurl + "/getrevenue/";
           for (var i = 3; i < dates.months.length; i++) {
               if (dates.months[i] < 10) {
                   month = "0" + dates.months[i];
               } else
                   month = dates.months[i];

               url += dates.years[0] + "-" + month + "/";
           }

           url += type + "/" + uid + "/" + location + "/" + listofcompany;
           $http.get(url).success(function (response) {
               //debugger;
               var month = getListMonthNames("lasttwoquaters");
               for (var i = 0; i < response.length; i++) {
                   jsonData[i][month[3]] = response[i][month[3]];
                   jsonData[i][month[4]] = response[i][month[4]];
                   jsonData[i][month[5]] = response[i][month[5]];
               }

               lasttwoquaters(jsonData);
           }).error();
       })
   .error();
    }
});









