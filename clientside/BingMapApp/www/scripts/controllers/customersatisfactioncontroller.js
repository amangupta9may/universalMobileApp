app.controller('customersatisfactioncntrl', function ($scope, $http,$q, Serviceurl) {
    //debugger;

    document.getElementById("Loading").style.display = "block";
    $scope.pcsattable = true;
    var uid = window.localStorage.getItem("uid");
    //var DMName = window.localStorage.getItem("reqchmDM");
    var listofdms = window.localStorage.getItem("SelectedDMList_Account");
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

    var currentQuater = getCurrentQuater();
    var dates = getMonthAndYearBasedOnQuater(currentQuater, "current");
    var month;


    url = Serviceurl + "/getpcsat/";
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

        $scope.datapcsat = response;

        document.getElementById("Loading").style.display = "none";
    })
    .error();



    url = Serviceurl + "/getpulse/";
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
        $scope.data = response;
    })
    .error();

    $scope.currentQtr = function () {
        url = Serviceurl + "/getpcsat/";
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
            $scope.datapcsat = response;
        })
        .error();



        url = Serviceurl + "/getpulse/";
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
            $scope.data = response;
        })
        .error();
    }

    $scope.openPCsat = function () {
        $scope.pcsattable = true;
        $scope.pulsetable = false;
    }

    $scope.openpulse = function () {
        $scope.pcsattable = false;
        $scope.pulsetable = true;
    }

    $scope.backtoPage = function () {
        window.location.href = "listofDMs_Account.html?tile=" + "csat";
    }

    $scope.PrevQtr = function () {


        var currentQuater = getCurrentQuater();
        var dates = getMonthAndYearBasedOnQuater(currentQuater, "previous");
        var month;

        var url = Serviceurl + "/getpulse/";
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
            $scope.data = "";
            $scope.data = response;
        }).error();

        url = Serviceurl + "/getpcsat/";
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
           $scope.datapcsat = "";
           $scope.datapcsat = response;
       }).error();
    }

    $scope.lasttwoQtrs = function () {

        var currentQuater = getCurrentQuater();
        var dates = getMonthAndYearBasedOnQuater(currentQuater, "lasttwoquaters");
        var month;

        var pulseData = [];
        var pcsatData = [];

        var url = Serviceurl + "/getpulse/";
        for (var i = 0; i < dates.months.length; i++) {
            if (dates.months[i] < 10) {
                month = "0" + dates.months[i];
            } else
                month = dates.months[i];

            url += dates.years[0] + "-" + month + "/";
        }
        url += uid + "/" + listofdms;       
       
        var defer = $q.defer();
        defer.promise.then(function () {
            $http.get(url)
              .success(function (data) {
                  for (var i = 0; i < data.length; i++) {
                      pulseData.push(data[i]);
                  }                  
                  $scope.data = pulseData;
             });
        }).then(function () {
            var url1 = Serviceurl + "/getpcsat/";
            for (var i = 3; i < dates.months.length; i++) {
                if (dates.months[i] < 10) {
                    month = "0" + dates.months[i];
                } else
                    month = dates.months[i];

                url1 += dates.years[0] + "-" + month + "/";
            }
            url1 += uid + "/" + listofdms;
            $http.get(url1)
             .success(function (data) {
                 for (var i = 0; i < data.length; i++) {
                     pcsatData.push(data[i]);
                 }                 
                 $scope.datapcsat = pcsatData;
             });
        });
       
       
        defer.resolve();
    }
});