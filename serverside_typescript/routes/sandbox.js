"use strict";
var express_1 = require('express');
var sample_1 = require('../app_modules/sample');
var sandbox = express_1.Router();
sandbox.get('/', function (req, res, next) {
    // 
    var t = new sample_1.default();
    t.executeQuery();
    //res.render('sandbox', { title: 'sandbox'});
    res.send(JSON.stringify({ a: 1 }));
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sandbox;
//# sourceMappingURL=sandbox.js.map