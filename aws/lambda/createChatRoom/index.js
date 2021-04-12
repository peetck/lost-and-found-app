const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const dynamodb = new AWS.DynamoDB.DocumentClient();

const CHATS_TABLE = "chats";
const MESSAGES_TABLE = "messages";

exports.handler = async (e) => {
  try {
    const data = JSON.parse(e.body);

    const id = uuidv4();

    // update rooms in chats table
    const params = {
      TableName: CHATS_TABLE,
      Key: {
        uid: data.uid,
      },
      UpdateExpression: "SET #rooms = list_append(#rooms, :vals)",
      ExpressionAttributeNames: {
        "#rooms": "rooms",
      },
      ExpressionAttributeValues: {
        ":vals": [{ uid: data.toUser.sub, id: id, seen: true }],
      },
      ReturnValues: "UPDATED_NEW",
    };

    await dynamodb.update(params).promise();
    await dynamodb
      .update({
        ...params,
        Key: {
          uid: data.toUser.sub,
        },
        ExpressionAttributeValues: {
          ":vals": [{ uid: data.uid, id: id, seen: true }],
        },
      })
      .promise();

    // create item in messages table
    await dynamodb
      .put({
        TableName: MESSAGES_TABLE,
        Item: {
          id: id,
          messages: [],
        },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: id,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message,
      }),
    };
  }
};
