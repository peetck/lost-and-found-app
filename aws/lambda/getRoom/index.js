const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "rooms";

exports.handler = async(e) => {
    try {
        const { roomId } = e.queryStringParameters;

        const params = {
            TableName: TABLE_NAME,
            Key: {
                "roomId": roomId,
            }
        };

        const room = await dynamodb.get(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(room),
        };
    }
    catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: err.message,
            }),
        };
    }
};
