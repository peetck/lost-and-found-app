const AWS = require("aws-sdk");
const ddbGeo = require("dynamodb-geo");

const TABLE_NAME = "posts";

const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const config = new ddbGeo.GeoDataManagerConfiguration(dynamodb, TABLE_NAME);
config.hashKeyLength = 6;
config.longitudeFirst = false;
const myGeoTableManager = new ddbGeo.GeoDataManager(config);

exports.handler = async (e) => {
  try {
    const { lat, lng, rad } = e.queryStringParameters;

    const items = await myGeoTableManager.queryRadius({
      RadiusInMeter: +rad,
      CenterPoint: {
        latitude: +lat,
        longitude: +lng,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(items),
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
