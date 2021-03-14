import AWS from "aws-sdk";

AWS.config.update({
  endpoint: "http://192.168.1.104:8000",
  accessKeyId: "xxxx",
  secretAccessKey: "xxxx",
  region: "eu-west-1",
});

export const dynamodb = new AWS.DynamoDB();

dynamodb.createTable(
  {
    TableName: "PICNIC",
    KeySchema: [
      { AttributeName: "item1", KeyType: "HASH" }, // Partition key -> HASH
      { AttributeName: "item2", KeyType: "RANGE" }, // Sort key -> RANGE
    ],
    AttributeDefinitions: [
      { AttributeName: "item1", AttributeType: "S" },
      { AttributeName: "item2", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  },
  (err, data) => {
    if (err) {
    } else {
      console.log(
        "Created table. Table description JSON:",
        JSON.stringify(data, null, 2)
      );
    }
  }
);

export const documentClient = new AWS.DynamoDB.DocumentClient();
