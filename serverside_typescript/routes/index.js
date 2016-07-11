"use strict";
var express_1 = require('express');
var index = express_1.Router();
var Car = (function () {
    //engine:string;//var dec
    function Car(engine) {
        this.engine = engine;
        this.engine = engine;
    }
    Car.prototype.start = function () {
        return 'Engine Started ' + this.engine;
    };
    return Car;
}());
index.get('/', function (req, res) {
    //res.render('index', { title: 'index'});
    //document.title ="Sajal";
    console.log("check");
    var car = new Car("V8");
    //car.start();
    res.send(car.start());
});
/* GET Quick Start. */
index.get('/quickstart', function (req, res, next) {
    res.render('quickstart');
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = index;
//# sourceMappingURL=index.js.map