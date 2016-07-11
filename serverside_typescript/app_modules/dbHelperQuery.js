"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dbHelperBase_1 = require('./dbHelperBase');
var dbHelperQuery = (function (_super) {
    __extends(dbHelperQuery, _super);
    function dbHelperQuery() {
        _super.apply(this, arguments);
    }
    dbHelperQuery.prototype.executeQuery = function (callback) {
        var self = this;
        this.getOrCreateDatabase(self.client, self.databaseId, function (err, db) {
            var me = self;
            if (err) {
                callback(err, null);
            }
            else {
                self.database = db;
                me.getOrCreateCollection(self.client, self.database._self, self.collectionId, function (err, coll) {
                    if (err) {
                        callback(err, null);
                    }
                    else {
                        self.collection = coll;
                        callback(err, coll);
                    }
                });
            }
        });
    };
    ;
    dbHelperQuery.prototype.find = function (querySpec, callback) {
        var self = this;
        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, results);
            }
        });
    };
    ;
    dbHelperQuery.prototype.addItem = function (item, callback) {
        var self = this;
        item.date = Date.now();
        item.completed = false;
        self.client.createDocument(self.collection._self, item, function (err, doc) {
            if (err) {
                callback(err);
            }
            else {
                callback(doc);
            }
        });
    };
    ;
    dbHelperQuery.prototype.updateItem = function (itemId, callback) {
        var self = this;
        self.getItem(itemId, function (err, doc) {
            if (err) {
                callback(err);
            }
            else {
                doc.completed = true;
                self.client.replaceDocument(doc._self, doc, function (err, replaced) {
                    if (err) {
                        callback(err);
                    }
                    else {
                        callback(null, replaced);
                    }
                });
            }
        });
    };
    ;
    dbHelperQuery.prototype.getItem = function (itemId, callback) {
        var self = this;
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                    name: '@id',
                    value: itemId
                }]
        };
        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, results[0]);
            }
        });
    };
    return dbHelperQuery;
}(dbHelperBase_1.default));
;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dbHelperQuery;
//# sourceMappingURL=dbHelperQuery.js.map