//var DocumentDBClient = require('documentdb').DocumentClient;

class dbHelperBase {
         client ;
         databaseId;
         collectionId ;

         database ;
         collection ;
    
    constructor(documentDBClient, databaseId, collectionId) {
         this.client = documentDBClient;
         this.databaseId = databaseId;
         this.collectionId = collectionId;

         this.database = null;
         this.collection = null;

    }
    
    getOrCreateDatabase(client, databaseId, callback) {
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                name: '@id',
                value: databaseId
            }]
        };

    client.queryDatabases(querySpec).toArray((err, results) =>{
            if (err) {
                callback(err);

            } else {
                if (results.length === 0) {
                    var databaseSpec = {
                        id: databaseId
                    };

                    client.createDatabase(databaseSpec, (err, created)=> {
                        callback(null, created);
                    });

                } else {
                    callback(null, results[0]);
                }
            }
        });
    };

    getOrCreateCollection(client, databaseLink, collectionId, callback) {
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                name: '@id',
                value: collectionId
            }]
        };

        client.queryCollections(databaseLink, querySpec).toArray((err, results)=> {
            if (err) {
                callback(err);

            } else {
                if (results.length === 0) {
                    var collectionSpec = {
                        id: collectionId
                    };

                    var requestOptions = {
                        offerType: 'S1'
                    };

                    client.createCollection(databaseLink, collectionSpec, requestOptions, function(err, created) {
                        callback(null, created);
                    });

                } else {
                    callback(null, results[0]);
                }
            }
        });
    }
};

export default dbHelperBase;