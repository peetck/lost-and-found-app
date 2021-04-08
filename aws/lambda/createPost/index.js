const AWS = require("aws-sdk");
const ddbGeo = require("dynamodb-geo");
const { v4: uuidv4 } = require("uuid");
const parser = require("lambda-multipart-parser");

const TABLE_NAME = "posts";

const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const config = new ddbGeo.GeoDataManagerConfiguration(dynamodb, TABLE_NAME);
config.hashKeyLength = 6;
config.longitudeFirst = false;
const myGeoTableManager = new ddbGeo.GeoDataManager(config);
const s3 = new AWS.S3();

exports.handler = async (e) => {
  try {
    const data = await parser.parse(e);

    const key = uuidv4();

    const { content, contentType } = data.files[0];

    const params = {
      Bucket: "lost-and-found-app-bucket",
      Key: key,
      Body: content,
      ContentType: contentType,
      ACL: "public-read",
    };

    const { Location } = await s3.upload(params).promise();

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
        S: Location,
      },
      mapUrl: {
        S: data.mapUrl,
      },
      title: {
        S: data.title,
      },
      uid: {
        S: data.uid,
      },
      categoryId: {
        S: data.categoryId,
      },
    };

    await myGeoTableManager
      .putPoint({
        RangeKeyValue: {
          S: key,
        },
        GeoPoint: {
          latitude: +data.lat,
          longitude: +data.lng,
        },
        PutItemInput: {
          Item: item,
        },
      })
      .promise();

    return {
      statusCode: 201,
      body: JSON.stringify(item),
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
