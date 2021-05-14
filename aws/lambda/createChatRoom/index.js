const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();

const CHATS_TABLE = "chats";
const ROOMS_TABLE = "rooms";

exports.handler = async(e) => {
  try {
    const data = JSON.parse(e.body);

    const roomId = data.roomId;

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
        ":vals": [{
          uid: data.toUser.sub,
          roomId: roomId,
        }],
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
          ":vals": [{
            uid: data.uid,
            roomId: roomId,

          }],
        },
      })
      .promise();

   
    await dynamodb
      .put({
        TableName: ROOMS_TABLE,
        Item: {
          roomId: roomId,
          messages: [],
          seen: true,
          last: {
            on: new Date().toISOString()
          },
        },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        roomId: roomId,
        seen: true,
        last: {}
      }),
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
