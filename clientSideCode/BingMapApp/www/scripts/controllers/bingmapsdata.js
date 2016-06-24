var map = null;
var InfoBoxEntity = null;
var PushPinsEntity = null;
var mapsdata = [
{
    "Revenue": [{ "quater": "q1", "value": 500 }, { "quater": "q2", "value": 450 }, { "quater": "q3", "value": 500 }, { "quater": "q4", "value": 550 }],
    "Lat": 28.633,
    "Lon": 77.219,
    "Title": "New Delhi, India",
    "Description": "Capital and one of the Historical place of India",
    "name": "Sajal Mitra"
},
{
    "Revenue": [{ "quater": "q1", "value": 300 }, { "quater": "q2", "value": 350 }, { "quater": "q3", "value": 400 }, { "quater": "q4", "value": 450 }],
    "Lat": 51.48549938466352,
    "Lon": -0.10674425522154696,
    "Title": "London, UK",
    "Description": "Beautiful place of England"
},
{
    "Revenue": [{ "quater": "q1", "value": 300 }, { "quater": "q2", "value": 250 }, { "quater": "q3", "value": 450 }, { "quater": "q4", "value": 400 }],
    "Lat": 55.752478073030616,
    "Lon": 37.624426399075325,
    "Title": "Moscow, Russia",
    "Description": "Revolutionary place and Capital of Russia"
},
{
    "Revenue": [{ "quater": "q1", "value": 250 }, { "quater": "q2", "value": 350 }, { "quater": "q3", "value": 400 }, { "quater": "q4", "value": 350 }],
    "Lat": 30.032022566346278,
    "Lon": 31.23587659438783,
    "Title": "Cairo, Egypt",
    "Description": "A Place of Mysterious Pyramids"
},
{
    "Revenue": [{ "quater": "q1", "value": 200 }, { "quater": "q2", "value": 350 }, { "quater": "q3", "value": 400 }, { "quater": "q4", "value": 550 }],
    "Lat": -23.04332469099961,
    "Lon": -43.17315050522155,
    "Title": "Rio de Janeiro, Brazil",
    "Description": "Beautiful place of Brazil"
}
]


function LoadMap() {
    //debugger;
    map = new Microsoft.Maps.Map(document.getElementById('MyMap'), {
        credentials: "AsIc5m_UvaEs-RPaTrw0XRyl9nVaDCPMCqxjdAi_1eQBQXYr8iFtEZ_ttfwwu_7v",
        mapTypeId: Microsoft.Maps.MapTypeId.road
    });

    PushPinsEntity = new Microsoft.Maps.EntityCollection();
    map.entities.push(PushPinsEntity);

    InfoBoxEntity = new Microsoft.Maps.EntityCollection();
    map.entities.push(InfoBoxEntity);

    map.setView({
        center: new Microsoft.Maps.Location(47.27197080559039, 1.303472656250002),
        zoom: 2
    });

    //var strJSON = document.getElementById('txtJSON');

    var strJSON = mapsdata;
    if (strJSON.length == 0) {
        alert('Please provide pushpin data in JSON format');
        return;
    }

    try {
        //var data = JSON.parse(strJSON);
        var data = strJSON;

        SetPushPins(data);
        strJSON.value = "";

    }
    catch (ex) {
        alert('ERROR: Please provide valid JSON data');
    }
}

function SetPushPins(PushPinData) {
    if (PushPinData.length == 0)
        return;


    for (var i = 0; i < PushPinData.length; i++) {
        var Loc = new Microsoft.Maps.Location(PushPinData[i].Lat, PushPinData[i].Lon);
        var Pushpin = new Microsoft.Maps.Pushpin(Loc);
        var currentQuater = getCurrentQuater();
        var currentQuaterRevenue = getQuaterRevenue(PushPinData[i].Revenue, currentQuater);
        var previousQuater = getPreviousQuater();
        var previousQuaterRevenue = getQuaterRevenue(PushPinData[i].Revenue, previousQuater);
        if (currentQuaterRevenue > previousQuaterRevenue) {
            Pushpin = new Microsoft.Maps.Pushpin(Loc, { icon: 'images/Green_pin.png', width: 50, height: 50, draggable: true });
        }
        else {
            Pushpin = new Microsoft.Maps.Pushpin(Loc, { icon: 'images/Red_pin.png', width: 50, height: 50, draggable: true });
        }
        Pushpin.Title = PushPinData[i].Title;
        Pushpin.Description = PushPinData[i].Description;
        Pushpin.Revenue = PushPinData[i].Revenue;

        //$("#name").text = PushPinData[i].name;
        //$("#name").html = PushPinData[i].name;
        $("#name").text(PushPinData[i].name);

        var InfoBox = new Microsoft.Maps.Infobox(Loc, { visible: false, offset: new Microsoft.Maps.Point(0, 30) });

        Microsoft.Maps.Events.addHandler(Pushpin, 'click', function (e) {
            //window.location.href = "Views/ManagersTiles.html";
            var url = "Views/ManagersTiles.html";

            CORSMsg.SendMsg(url, window.parent);

            $("#backpagediv").show();
            InfoBox.setLocation(e.target.getLocation());



            $("#detailslocation").modal("toggle");


            InfoBox.setOptions({
                visible: false,
                title: e.target.Title,
                description: e.target.Description,
                name: e.target.name
            });
        });

        InfoBoxEntity.push(InfoBox);
        PushPinsEntity.push(Pushpin);
    }
}

function getCurrentQuater() {
    var d = new Date();
    var q = [4, 1, 2, 3];
    var cq = q[Math.floor(d.getMonth() / 3)];
    return cq;
}

function getPreviousQuater() {
    var d = new Date();
    var q = [4, 1, 2, 3];
    var cq = q[Math.floor(d.getMonth() / 3)];
    var pq = cq - 1;
    if (pq <= 0)
        return 1;
    else
        return pq;
}

function getQuaterRevenue(revenue, quater) {
    for (var i = 0; i < revenue.length; i++) {
        if (revenue[i].quater === "q" + quater) {
            return revenue[i].value;
        }
    }
}
