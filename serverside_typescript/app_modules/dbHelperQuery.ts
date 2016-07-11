import dbHelperBase from './dbHelperBase';

class dbHelperQuery extends dbHelperBase{
    executeQuery (callback) {
        var self = this;

        this.getOrCreateDatabase(self.client, self.databaseId,  (err, db)=> {
            var me = self;
            if (err) {
                callback(err,null);

            } else {
                self.database = db;
                me.getOrCreateCollection(self.client, self.database._self, self.collectionId,  (err, coll) => {
                    if (err) {
                        callback(err,null);

                    } else {
                        self.collection = coll;
                        callback(err,coll);
                    }
                });
            }
        });
    };

    find (querySpec, callback) {
        var self = this;

        self.client.queryDocuments(self.collection._self, querySpec).toArray( (err, results)=> {
            if (err) {
                callback(err);

            } else {
                callback(null, results);
            }
        });
    };

    addItem (item, callback) {
        var self = this;

        item.date = Date.now();
        item.completed = false;

        self.client.createDocument(self.collection._self, item, (err, doc)=> {
            if (err) {
                callback(err);

            } else {
                callback(doc);
            }
        });
    };

    updateItem (itemId, callback) {
        var self = this;

        self.getItem(itemId, (err, doc)=> {
            if (err) {
                callback(err);

            } else {
                doc.completed = true;

                self.client.replaceDocument(doc._self, doc,  (err, replaced)=> {
                    if (err) {
                        callback(err);

                    } else {
                        callback(null, replaced);
                    }
                });
            }
        });
    };

    getItem (itemId, callback) {
        var self = this;

        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                name: '@id',
                value: itemId
            }]
        };

        self.client.queryDocuments(self.collection._self, querySpec).toArray( (err, results)=> {
            if (err) {
                callback(err);

            } else {
                callback(null, results[0]);
            }
        });
    }
};

export default dbHelperQuery
