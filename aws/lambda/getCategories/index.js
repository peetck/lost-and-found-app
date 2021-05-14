const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const TABLE_NAME = "categories";

exports.handler = async(e) => {

  try {
    const params = {
      TableName: TABLE_NAME,
    };

    const items = await dynamodb.scan(params).promise();

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
