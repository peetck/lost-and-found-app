const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const TABLE_NAME = "chats";

exports.handler = async(e) => {

    try {
        
        const { uid } = e.queryStringParameters;

        const params = {
            TableName: TABLE_NAME,
            Key: {
                "uid": { "S": uid }
            },
        };

        const items = await dynamodb.getItem(params).promise();

        return {
            "statusCode": 200,
            "body": JSON.stringify(items)
        }
    }
    catch (err) {
        return {
            "statusCode": 500,
            "body": JSON.stringify({
                message: err.message
            })
        }
    }


}
