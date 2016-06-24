
//open
app.controller('codcntrl', function ($scope, $http, $location, Serviceurl) {
    //done only for current quater
    //debugger;

    document.getElementById("Loading").style.display = "block";
    var uid = window.localStorage.getItem("uid");
    var listofdms = window.localStorage.getItem("SelectedDMList_Account");;//getUrlParameter("listofdeliverynames", $location.absUrl());
  //  var location = window.localStorage.getItem("location");

    var monthYear = getCurrentMonthAndYear();
    var type = "revenuechart";

    var currentQuater = getCurrentQuater();
    var dates = getMonthAndYearBasedOnQuater(currentQuater, "current");
    var month;
    
    var url = Serviceurl + "/cod/";
    for (var i = 0; i < dates.months.length; i++) {
        if (dates.months[i] < 10) {
            month = "0" + dates.months[i];
        } else
            month = dates.months[i];

        url += dates.years[0] + "-" + month + "/";
    }
    url += uid + "/" + listofdms;

    $http.get(url)
    .success(function (response) {
        //debugger;
        $scope.coddata = response;
        DataBind(response);
    })
    .error();

    $scope.backtoPage = function () {
        window.location.href = "listofDMs_Account.html";
    }

    function DataBind(data) {
        //debugger;

        var TTLinechartfillcolor = "rgba(40, 149, 205,0.2)",
            TTLinechartstrokeColor = "rgba(40, 149, 205,1)",
            TTLinechartpointcolor = "rgba(40, 149, 205,1)",
            TTLinechartpointstrokecolor = "#fff",
            TTLinechartpointHighlightFill = "#fff",
            TTLinechartpointHighlightStroke = "rgba(40, 149, 205,1)";
        var ATLinechartfillcolor = "rgba(151, 203, 226,0.2)",
            ATLinechartstrokeColor = "rgba(151, 203, 226,1)",
            ATLinechartpointcolor = "rgba(151, 203, 226,1)",
            ATLinechartpointstrokecolor = "#fff",
            ATLinechartpointHighlightFill = "#fff",
            ATLinechartpointHighlightStroke = "rgba(220,220,220,1)";
        var PTLinechartfillcolor = "rgba(220,220,220,0.2)",
            PTLinechartstrokeColor = "rgba(220,220,220,1)",
            PTLinechartpointcolor = "rgba(220,220,220,1)",
            PTLinechartpointstrokecolor = "#fff",
            PTLinechartpointHighlightFill = "#fff",
            PTLinechartpointHighlightStroke = "rgba(220,220,220,1)";

        var labels = [];
        var grossdata = [];
        var omdata = [];
        var coddata = [];
        for (var i = 0; i < data.length; i++) {
            labels.push(data[i].DMManager);
            grossdata.push(data[i]["Gross Margin"].replace('%', ''));
            omdata.push(data[i].OM.replace('%', ''));
            coddata.push(data[i].COD.replace('%', ''));
        }

        var linechartdataQ1 = {
            labels: labels,
            datasets: [
                {
                    label: "Gross Margin",
                    fillColor: TTLinechartfillcolor,
                    strokeColor: TTLinechartstrokeColor,
                    pointColor: TTLinechartpointcolor,
                    pointStrokeColor: TTLinechartpointstrokecolor,
                    pointHighlightFill: TTLinechartpointHighlightFill,
                    pointHighlightStroke: TTLinechartpointHighlightStroke,
                    data: grossdata
                },
                {
                    label: "OM",
                    fillColor: ATLinechartfillcolor,
                    strokeColor: ATLinechartstrokeColor,
                    pointColor: ATLinechartpointcolor,
                    pointStrokeColor: ATLinechartpointstrokecolor,
                    pointHighlightFill: ATLinechartpointHighlightFill,
                    pointHighlightStroke: ATLinechartpointHighlightStroke,
                    data: omdata
                }
                ,
                {
                    label: "COD",
                    fillColor: PTLinechartfillcolor,
                    strokeColor: PTLinechartstrokeColor,
                    pointColor: PTLinechartpointcolor,
                    pointStrokeColor: PTLinechartpointstrokecolor,
                    pointHighlightFill: PTLinechartpointHighlightFill,
                    pointHighlightStroke: PTLinechartpointHighlightStroke,
                    data: coddata
                }
            ]
        };
        var ctx = document.getElementById("canvas").getContext("2d");
        ctx.canvas.width = "300";
        ctx.canvas.height = "300";

        new Chart(ctx).Bar(linechartdataQ1, {
            bezierCurve: false
        });

        document.getElementById("Loading").style.display = "none";
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
});