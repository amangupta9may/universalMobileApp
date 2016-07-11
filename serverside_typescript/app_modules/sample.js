/// <reference path="../../typings/main.d.ts" />
"use strict";
var DocumentDBClient = require("documentdb").DocumentClient;
var config_1 = require('../config');
var dbHelperQuery_1 = require('./dbHelperQuery');
var sample = (function () {
    function sample() {
        this.configObj = new config_1.default();
        this.docDbClient = new DocumentDBClient(this.configObj.host, {
            masterKey: this.configObj.authKey
        });
        this.dbHelperQueryObj = new dbHelperQuery_1.default(this.docDbClient, this.configObj.databaseId, this.configObj.collectionId);
    }
    sample.prototype.executeQuery = function () {
        var _this = this;
        this.dbHelperQueryObj.executeQuery(function (err, items) {
            if (err) {
                throw (err);
            }
            else {
                var query = {
                    query: 'SELECT * FROM root r where r.type=@type and r.uid=@uid',
                    parameters: [{
                            name: '@type',
                            value: 'master'
                        },
                        {
                            name: '@uid',
                            value: '49aaf588-25b3-47a1-ba68-d9af38f37e2e'
                        }
                    ]
                };
                _this.dbHelperQueryObj.find(query, function (err, items) {
                    if (err) {
                        throw (err);
                    }
                    debugger;
                    var screenslst = items[0].screens;
                    console.log(screenslst[0]);
                });
                _this.dbHelperQueryObj.addItem({ "test": 5 }, function (item) {
                    debugger;
                });
            }
        });
    };
    return sample;
}());
var Person = (function () {
    function Person() {
    }
    return Person;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sample;
//# sourceMappingURL=sample.js.map