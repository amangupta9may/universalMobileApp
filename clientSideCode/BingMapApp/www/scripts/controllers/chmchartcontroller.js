
app.controller('chmchartcntrl', function ($scope, $http, Serviceurl) {

    document.getElementById("Loading").style.display = "block";
    var uid = window.localStorage.getItem("uid");
    var chmparameters = window.localStorage.getItem("chmparameter");
    window.localStorage.setItem("reqchmDataFor", "a"); //accounts
    var reqchmDataFor = window.localStorage.getItem("reqchmDataFor");

    var reqchmDM = window.localStorage.getItem("SelectedDMList_Account");

    $http.get(Serviceurl + "/getchmparametersdata/chmchart/"+ reqchmDataFor + "/" + uid + "/" + reqchmDM)
    .success(function (response) {
        ////debugger;
        //console.log(response);
        var d = new Date(); // If no date supplied, use today
        var q = [4, 1, 2, 3];
        var cq = q[Math.floor(d.getMonth() / 3)];

        var reqMonthArray = [];
        var reqResponse = [];

        for (var i = 0; i < response.length; i++) {
            var reqdate = response[i].date;
            //console.log(reqdate);
            //console.log(response[i]);
            if (cq == 4 && getMonth(reqdate) >= 1 && getMonth(reqdate) <= 3) {
                if (reqMonthArray.length == 0)
                    reqMonthArray.push(1, 2, 3);
                reqResponse.push(response[i]);
            }
            else if (cq == 1 && getMonth(reqdate) >= 4 && getMonth(reqdate) <= 6) {
                if (reqMonthArray.length == 0)
                    reqMonthArray.push(4, 5, 6);
                reqResponse.push(response[i]);
            }
            else if (cq == 2 && getMonth(reqdate) >= 7 && getMonth(reqdate) <= 9) {
                if (reqMonthArray.length == 0)
                    reqMonthArray.push(7, 8, 9);
                reqResponse.push(response[i]);
            }
            else if (cq == 3 && getMonth(reqdate) >= 10 && getMonth(reqdate) <= 12) {
                if (reqMonthArray.length == 0)
                    reqMonthArray.push(10, 11, 12);
                reqResponse.push(response[i]);
            }
        }

        var noOfQuaters = 1;//current quater single one omly
       
        //console.log(reqResponse + " " + chmparameters + " " + noOfQuaters + " " + reqMonthArray);
        loadchmChartData(reqResponse, chmparameters, noOfQuaters, reqMonthArray);//parameters);
    })
    .error();

    $scope.quaterClick = function (x) {
        ////debugger;
        var req = x;
        var d = new Date(); // If no date supplied, use today
        var year = d.getFullYear();
        var q = [4, 1, 2, 3];
        var cq = q[Math.floor(d.getMonth() / 3)];
        var months = [];

        var monthYearArray = [];
        var noOfQuaters = 1;

        if (x == 0) {
            //current quarter
            if (cq == 4)
                months.push(1, 2, 3);
            else if (cq == 1)
                months.push(4, 5, 6);
            else if (cq == 2)
                months.push(7, 8, 9);
            else if (cq == 3)
                months.push(10, 11, 12);

            for (var i = 0; i <= months.length - 1; i++) {
                monthYearArray.push({
                    month: months[i],
                    year: year
                });
            }
        }
        if (x == 1) {
            //next quarter
            if (cq == 4) {
                months.push(4, 5, 6);
                year = year;
            }
            else if (cq == 1) {
                months.push(7, 8, 9);
                year = year;
            }
            else if (cq == 2) {
                months.push(10, 11, 12);
                year = year;
            }
            else if (cq == 3) {
                months.push(1, 2, 3);
                year = year + 1;
            }

            for (var i = 0; i <= months.length - 1; i++) {
                monthYearArray.push({
                    month: months[i],
                    year: year
                });
            }
        }
        if (x == -1) {
            //prev quarter
            if (cq == 4) {
                months.push(10, 11, 12);
                year = year - 1;
            }
            else if (cq == 1) {
                months.push(1, 2, 3);
                year = year;
            }
            else if (cq == 2) {
                months.push(4, 5, 6);
                year = year;
            }
            else if (cq == 3) {
                months.push(7, 8, 9);
                year = year;
            }

            for (var i = 0; i <= months.length - 1; i++) {
                monthYearArray.push({
                    month: months[i],
                    year: year
                });
            }
        }
        if (x == -2) {
            noOfQuaters = 2;
            //Last two quarter
            if (cq == 4) {
                months.push(7, 8, 9, 10, 11, 12);
                year = year - 1;
            }
            else if (cq == 1) {
                //not clear
                months.push(10, 11, 12, 1, 2, 3);
                //year = year - 1;
            }
            else if (cq == 2) {
                months.push(1, 2, 3, 4, 5, 6);
                year = year;
            }
            else if (cq == 3) {
                months.push(4, 5, 6, 7, 8, 9);
                year = year;
            }

            var combinationalYearMonths = [10, 11, 12, 1, 2, 3];
            var are_equal = months.length == combinationalYearMonths.length && months.every(function (element, index) {
                return element === combinationalYearMonths[index];
            });

            if (are_equal) {
                for (var i = 0; i <= months.length - 1; i++) {

                    if (months[i] == 10 || months[i] == 11 || months[i] == 12)
                        monthYearArray.push({
                            month: months[i],
                            year: year - 1
                        });
                    else {
                        monthYearArray.push({
                            month: months[i],
                            year: year
                        });
                    }
                }
            }
            else {
                for (var i = 0; i <= months.length - 1; i++) {

                    monthYearArray.push({
                        month: months[i],
                        year: year
                    });
                }
            }
        }

        //var uid = window.localStorage.getItem("uid");

        //var reqchmDataFor = window.localStorage.getItem("reqchmDataFor");

        //var reqchmDM = window.localStorage.getItem("reqchmDM");

        $http.get(Serviceurl + "/getchmparametersdata/chmchart/" + reqchmDataFor + "/" + uid + "/" + reqchmDM)
        .success(function (response) {

            var reqResponse = [];

            for (var i = 0; i < response.length; i++) {
                for (var j = 0; j < monthYearArray.length; j++) {
                    var reqdate = response[i].date;
                    if (monthYearArray[j].month == getMonth(reqdate) && monthYearArray[j].year == getFullYear(reqdate))
                        reqResponse.push(response[i]);
                }
            }

            loadchmChartData(reqResponse, chmparameters, noOfQuaters, months);
        })
        .error();
    }

    $scope.backtoPage = function () {
        backtoPage1();
    }

    function backtoPage1() {
        window.location.href = "CHMParameters.html";
    };
});

function loadchmChartData(responsedata, filterparameter, noOfQuaters, reqMonthArray) {
    ////debugger;
   
    if (responsedata.length == 0) {
        alert("data does not exists");
        return;
    }

    var ctx = document.getElementById("canvas1").getContext("2d");
    ctx.canvas.width = "300";
    ctx.canvas.height = "280";

    var ctx1 = document.getElementById("canvas2").getContext("2d");
    ctx1.canvas.width = "300";
    ctx1.canvas.height = "280";

    var ctx2 = document.getElementById("canvas3").getContext("2d");
    ctx2.canvas.width = "300";
    ctx2.canvas.height = "280";

    var minictx1 = document.getElementById("minicanvas1").getContext("2d");
    minictx1.canvas.width = "90";
    minictx1.canvas.height = "90";

    var minictx2 = document.getElementById("minicanvas2").getContext("2d");
    minictx2.canvas.width = "90";
    minictx2.canvas.height = "90";

    var minictx3 = document.getElementById("minicanvas3").getContext("2d");
    minictx3.canvas.width = "90";
    minictx3.canvas.height = "90";

    var HeadCountLabel = null, Billable = null, Utilization = null, BillableBulge = null, BillableRookie = null;

    HeadCountLabel = document.getElementById('HeadCount');
    BillableLabel = document.getElementById('Billable');
    UtilizationLabel = document.getElementById('Utilization');
    BillableBulgeLabel = document.getElementById('BillableBulge');
    BillableRookieLabel = document.getElementById('BillableRookie');

    var TTbarchartfillcolor = "rgba(149,26,10,0.75)",
        TTbarchartstrokeColor = "rgba(149,26,10,0.8)",
        TTbarcharthighlightFill = "rgba(149,26,10,5)",
        TTbarcharthighlightStroke = "rgba(149,26,10,1)";
    var ATbarchartfillcolor = "rgba(89,171,86,0.75)",
        ATbarchartstrokeColor = "rgba(89,171,86,0.8)",
        ATbarcharthighlightFill = "rgba(89,171,86,5)",
        ATbarcharthighlightStroke = "rgba(89,171,86,1)";
    var PTbarchartfillcolor = "rgba(40, 149, 205,0.5)",
        PTbarchartstrokeColor = "rgba(40, 149, 205,0.8)",
        PTbarcharthighlightFill = "rgba(40, 149, 205,5)",
        PTbarcharthighlightStroke = "rgba(40, 149, 205,1)";

    //var TTLinechartfillcolor = "rgba(40, 149, 205,0.2)",
    //    TTLinechartstrokeColor = "rgba(40, 149, 205,1)",
    //    TTLinechartpointcolor = "rgba(40, 149, 205,1)",
    //    TTLinechartpointstrokecolor = "#fff",
    //    TTLinechartpointHighlightFill = "#fff",
    //    TTLinechartpointHighlightStroke = "rgba(40, 149, 205,1)";
    //var ATLinechartfillcolor = "rgba(151, 203, 226,0.2)",
    //    ATLinechartstrokeColor = "rgba(151, 203, 226,1)",
    //    ATLinechartpointcolor = "rgba(151, 203, 226,1)",
    //    ATLinechartpointstrokecolor = "#fff",
    //    ATLinechartpointHighlightFill = "#fff",
    //    ATLinechartpointHighlightStroke = "rgba(151, 203, 226,1)";

    //var Q1Labels = ["January", "February", "March"],
    //    Q2Labels = ["April", "May", "June"],
    //    Q3Labels = ["July", "August", "September"],
    //    Q4Labels = ["October", "November", "December"];
    //var Q1TTdata = [65, 59, 60],
    //    Q1ATdata = [70, 60, 40],
    //    Q2TTdata = [80, 90, 85],
    //    Q2ATdata = [68, 100, 60],
    //    Q3TTdata = [65, 59, 80],
    //    Q3ATdata = [28, 70, 40],
    //    Q4TTdata = [105, 70, 90],
    //    Q4ATdata = [100, 80, 90];

    var labels = [];
    var HeadCountLabelsum = 0, BillableLabelsum = 0, UtilizationLabelsum = 0, BillableBulgeLabelsum = 0, BillableRookieLabelsum = 0;
    //var billabledataonly = [], billablebulgedataonly = [], billablerookiedataonly = [];
    if (noOfQuaters == 1) {
        labels.push(getMonthNameByMonthNo(reqMonthArray[0]), getMonthNameByMonthNo(reqMonthArray[1]), getMonthNameByMonthNo(reqMonthArray[2]));
        var billabledataonly = [0, 0, 0], billablebulgedataonly = [0, 0, 0], billablerookiedataonly = [0, 0, 0];
    }
    else {
        labels.push(getMonthNameByMonthNo(reqMonthArray[0]), getMonthNameByMonthNo(reqMonthArray[1]), getMonthNameByMonthNo(reqMonthArray[2]), getMonthNameByMonthNo(reqMonthArray[3]), getMonthNameByMonthNo(reqMonthArray[4]), getMonthNameByMonthNo(reqMonthArray[5]));
        var billabledataonly = [0, 0, 0, 0, 0, 0], billablebulgedataonly = [0, 0, 0, 0, 0, 0], billablerookiedataonly = [0, 0, 0, 0, 0, 0];
    }

    for (var i = 0; i < responsedata.length; i++) {
        var reqFilteredByParameterData = JsonSplitData(responsedata[i], filterparameter);
        var reqdate = responsedata[i].date;
        var m = getMonth(reqdate);

        index = reqMonthArray.indexOf(m);

        if (filterparameter == "Gross") {
            if (reqFilteredByParameterData["Gross Billable #"] != null)
                billabledataonly[index] = reqFilteredByParameterData["Gross Billable #"];

            if (reqFilteredByParameterData["Gross Billable Bulge"] != null)
                billablebulgedataonly[index] = reqFilteredByParameterData["Gross Billable Bulge"].replace('%', '');

            if (reqFilteredByParameterData["Gross Billable Rookie"] != null)
                billablerookiedataonly[index] = reqFilteredByParameterData["Gross Billable Rookie"].replace('%', '');

            HeadCountLabelsum = HeadCountLabelsum + parseInt(reqFilteredByParameterData["Gross #"].replace('%', ''));
            BillableLabelsum = BillableLabelsum + parseInt(reqFilteredByParameterData["Gross Billable #"].replace('%', ''));
            UtilizationLabelsum = UtilizationLabelsum + parseFloat(reqFilteredByParameterData["Gross Utilization"].replace('%', ''));
            BillableBulgeLabelsum = BillableBulgeLabelsum + parseFloat(reqFilteredByParameterData["Gross Billable Bulge"].replace('%', ''));
            BillableRookieLabelsum = BillableRookieLabelsum + parseFloat(reqFilteredByParameterData["Gross Billable Rookie"].replace('%', ''));
        }
        else if (filterparameter == "Onsite") {
            if (reqFilteredByParameterData["Onsite Billable #"] != null)
                billabledataonly[index] = reqFilteredByParameterData["Onsite Billable #"];

            if (reqFilteredByParameterData["Onsite NB #"] != null)
                billablebulgedataonly[index] = reqFilteredByParameterData["Onsite NB #"].replace('%', '');

            if (reqFilteredByParameterData["Onsite Contractors"] != null)
                billablerookiedataonly[index] = reqFilteredByParameterData["Onsite Contractors"].replace('%', '');

            HeadCountLabelsum = HeadCountLabelsum + parseInt(reqFilteredByParameterData["Onsite #"].replace('%', ''));
            BillableLabelsum = BillableLabelsum + parseInt(reqFilteredByParameterData["Onsite Billable #"]);
            UtilizationLabelsum = UtilizationLabelsum + parseFloat(reqFilteredByParameterData["Onsite Utilization"].replace('%', ''));
            BillableBulgeLabelsum = BillableBulgeLabelsum + parseFloat(reqFilteredByParameterData["Onsite NB #"].replace('%', ''));
            BillableRookieLabelsum = BillableRookieLabelsum + parseFloat(reqFilteredByParameterData["Onsite Contractors"].replace('%', ''));
        }
        else if (filterparameter == "Offshore") {
            if (reqFilteredByParameterData["Offshore Billable #"] != null)
                billabledataonly[index] = reqFilteredByParameterData["Offshore Billable #"];

            if (reqFilteredByParameterData["Offshore NB #"] != null)
                billablebulgedataonly[index] = reqFilteredByParameterData["Offshore NB #"].replace('%', '');

            if (reqFilteredByParameterData["Offshore Non-Rookie NB #"] != null)
                billablerookiedataonly[index] = reqFilteredByParameterData["Offshore Non-Rookie NB #"].replace('%', '');

            HeadCountLabelsum = HeadCountLabelsum + parseInt(reqFilteredByParameterData["Offshore #"].replace('%', ''));
            BillableLabelsum = BillableLabelsum + parseInt(reqFilteredByParameterData["Offshore Billable #"].replace('%', ''));
            UtilizationLabelsum = UtilizationLabelsum + parseFloat(reqFilteredByParameterData["Offshore Utilization"].replace('%', ''));
            BillableBulgeLabelsum = BillableBulgeLabelsum + parseFloat(reqFilteredByParameterData["Offshore NB #"].replace('%', ''));
            BillableRookieLabelsum = BillableRookieLabelsum + parseFloat(reqFilteredByParameterData["Offshore Non-Rookie NB #"].replace('%', ''));
        }
    }

    HeadCountLabel.innerHTML = HeadCountLabelsum;
    BillableLabel.innerHTML = BillableLabelsum;
    UtilizationLabel.innerHTML = UtilizationLabelsum.toFixed(2) + " %";
    BillableBulgeLabel.innerHTML = BillableBulgeLabelsum.toFixed(2) + " %";
    BillableRookieLabel.innerHTML = BillableRookieLabelsum.toFixed(2) + " %";

    var barChartDataQ1 = {
        labels: labels,
        datasets: [
            {
                fillColor: TTbarchartfillcolor,
                strokeColor: TTbarchartstrokeColor,
                highlightFill: TTbarcharthighlightFill,
                highlightStroke: TTbarcharthighlightStroke,
                data: billabledataonly
            }
        ]
    }

    var minibarChartDataQ1 = {
        labels: ["", "", ""],
        datasets: [
            {
                fillColor: TTbarchartfillcolor,
                strokeColor: TTbarchartstrokeColor,
                highlightFill: TTbarcharthighlightFill,
                highlightStroke: TTbarcharthighlightStroke,
                data: billabledataonly
            }
        ]
    }

    var barChartDataQ2 = {
        labels: labels,
        datasets: [
            {
                fillColor: ATbarchartfillcolor,
                strokeColor: ATbarchartstrokeColor,
                highlightFill: ATbarcharthighlightFill,
                highlightStroke: ATbarcharthighlightStroke,
                data: billablebulgedataonly
            }
        ]

    }

    var minibarChartDataQ2 = {
        labels: ["", "", ""],
        datasets: [
            {
                fillColor: ATbarchartfillcolor,
                strokeColor: ATbarchartstrokeColor,
                highlightFill: ATbarcharthighlightFill,
                highlightStroke: ATbarcharthighlightStroke,
                data: billablebulgedataonly
            }
        ]

    }

    var barChartDataQ3 = {
        labels: labels,
        datasets: [
             {
                 fillColor: PTbarchartfillcolor,
                 strokeColor: PTbarchartstrokeColor,
                 highlightFill: PTbarcharthighlightFill,
                 highlightStroke: PTbarcharthighlightStroke,
                 data: billablerookiedataonly
             }
        ]

    }

    var minibarChartDataQ3 = {
        labels: ["", "", ""],
        datasets: [
             {
                 fillColor: PTbarchartfillcolor,
                 strokeColor: PTbarchartstrokeColor,
                 highlightFill: PTbarcharthighlightFill,
                 highlightStroke: PTbarcharthighlightStroke,
                 data: billablerookiedataonly
             }
        ]

    }

    window.myBar = new Chart(ctx).Bar(barChartDataQ1, {
        responsive: false
    });
    window.myBar = new Chart(ctx1).Bar(barChartDataQ2, {
        responsive: false
    });
    window.myBar = new Chart(ctx2).Bar(barChartDataQ3, {
        responsive: false
    });

    window.myBar = new Chart(minictx1).Bar(minibarChartDataQ1, {
        responsive: false,
        scaleShowLabels: false,
        pointLabelFontSize: 0,
        scaleFontSize: 15,
        barValueSpacing: 1,
        barDatasetSpacing: 1,
        showTooltips: false,
        tooltipYPadding: 0
    });
    window.myBar = new Chart(minictx2).Bar(minibarChartDataQ2, {
        responsive: false,
        scaleBackdropPaddingX: 1,
        scaleShowLabels: false,
        barValueSpacing: 1,
        barDatasetSpacing: 1,
        showTooltips: false,
        tooltipYPadding: 0
    });
    window.myBar = new Chart(minictx3).Bar(minibarChartDataQ3, {
        responsive: false,
        legendTemplate: '',
        scaleShowLabels: false,
        barValueSpacing: 2,
        barDatasetSpacing: 1,
        showTooltips: false,
        tooltipYPadding: 0
    });

    document.getElementById("Loading").style.display = "none";
};

function getMonthNameByMonthNo(monthNo) {
    var monthNames = ["January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"
    ];

    var monthName = monthNames[monthNo - 1];

    return monthName;
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

function getFullYear(graphdate) {
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
        parseInt(graphdate.substring(7, 11)),               // year
        months.en[graphdate.substring(3, 6).toLowerCase()], // month
        parseInt(graphdate.substring(0, 2))             // day
    );
    return dt.getFullYear();
}

function JsonSplitData(responsedata, filterparameter) {
    var arr = Object.keys(responsedata);

    var fields = arr;
    var res = {};
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].indexOf(filterparameter) > -1) {
            res[fields[i]] = responsedata[fields[i]];
        }
    }
    return res;
}
