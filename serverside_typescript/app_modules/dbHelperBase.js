//var DocumentDBClient = require('documentdb').DocumentClient;
"use strict";
var dbHelperBase = (function () {
    function dbHelperBase(documentDBClient, databaseId, collectionId) {
        this.client = documentDBClient;
        this.databaseId = databaseId;
        this.collectionId = collectionId;
        this.database = null;
        this.collection = null;
    }
    dbHelperBase.prototype.getOrCreateDatabase = function (client, databaseId, callback) {
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                    name: '@id',
                    value: databaseId
                }]
        };
        client.queryDatabases(querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);
            }
            else {
                if (results.length === 0) {
                    var databaseSpec = {
                        id: databaseId
                    };
                    client.createDatabase(databaseSpec, function (err, created) {
                        callback(null, created);
                    });
                }
                else {
                    callback(null, results[0]);
                }
            }
        });
    };
    ;
    dbHelperBase.prototype.getOrCreateCollection = function (client, databaseLink, collectionId, callback) {
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                    name: '@id',
                    value: collectionId
                }]
        };
        client.queryCollections(databaseLink, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);
            }
            else {
                if (results.length === 0) {
                    var collectionSpec = {
                        id: collectionId
                    };
                    var requestOptions = {
                        offerType: 'S1'
                    };
                    client.createCollection(databaseLink, collectionSpec, requestOptions, function (err, created) {
                        callback(null, created);
                    });
                }
                else {
                    callback(null, results[0]);
                }
            }
        });
    };
    return dbHelperBase;
}());
;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dbHelperBase;
//# sourceMappingURL=dbHelperBase.js.map