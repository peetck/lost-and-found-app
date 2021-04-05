const AWS = require("aws-sdk");
const ddbGeo = require("dynamodb-geo");
const { v4: uuidv4 } = require("uuid");
const multipart = require("aws-lambda-multipart-parser");

const TABLE_NAME = "posts";

const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const config = new ddbGeo.GeoDataManagerConfiguration(dynamodb, TABLE_NAME);
config.hashKeyLength = 6;
const myGeoTableManager = new ddbGeo.GeoDataManager(config);

exports.handler = async (e, ctx, cb) => {
  try {
    if (e.isBase64Encoded) {
      e.body = Buffer.from(e.body, "base64").toString();
    }
    const data = multipart.parse(e, true);

    const item = {
      address: {
        S: data.address,
      },
      description: {
        S: data.description,
      },
      expirationDate: {
        S: data.expirationDate,
      },
      imageUrl: {
        S: data.imageUrl,
      },
      mapUrl: {
        S: data.mapUrl,
      },
      title: {
        S: data.title,
      },
    };

    await myGeoTableManager
      .putPoint({
        RangeKeyValue: {
          S: uuidv4(),
        },
        GeoPoint: {
          latitude: +data.latitude,
          longitude: +data.longitude,
        },
        PutItemInput: {
          Item: item,
        },
      })
      .promise();

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(item),
    };

    cb(null, response);
  } catch (err) {
    cb(err);
  }
};
