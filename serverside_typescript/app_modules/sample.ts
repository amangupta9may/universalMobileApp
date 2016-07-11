/// <reference path="../../typings/main.d.ts" />

var DocumentDBClient = require("documentdb").DocumentClient;
import config from '../config';
import dbHelperBase from './dbHelperBase';
import dbHelperQuery from './dbHelperQuery';

class sample {

    configObj;
    docDbClient;
    dbHelperQueryObj;
    
    constructor() {
        this.configObj = new config();
        this.docDbClient = new DocumentDBClient(this.configObj.host, {
            masterKey: this.configObj.authKey
        });
        this.dbHelperQueryObj = new dbHelperQuery(this.docDbClient, this.configObj.databaseId, this.configObj.collectionId);
    }



    executeQuery() {
        this.dbHelperQueryObj.executeQuery((err, items) => {
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

                this.dbHelperQueryObj.find(query, (err, items) => {
                    if (err) {
                        throw (err);
                    }
                    debugger;
                    var screenslst = items[0].screens;
                    console.log(screenslst[0]);
                });

                this.dbHelperQueryObj.addItem({ "test": 5 }, (item) => {
                    debugger;
                })

            }
        });


    }
}







class Person {
    name: string;
    age: number;
}


export default sample;