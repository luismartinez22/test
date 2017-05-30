'use strict';

console.log('Loading function');

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});

exports.handler = (event, context, callback) => {
    let scanningParameters = {
        TableName: "Article",
        Limit: 9
    };
    for(var rw = 0; rw < 5000; rw++){

    docClient.scan(scanningParameters, function(err, data){
        if(err){
            callback(err, null);
        }else{
            callback(null, data);
            var pag = data.LastEvaluatedKey;
        }
    });
    }
}