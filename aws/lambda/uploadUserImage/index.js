const AWS = require("aws-sdk");
const parser = require("lambda-multipart-parser");
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

const s3 = new AWS.S3();

exports.handler = async(e) => {
  try {
    const data = await parser.parse(e);

    const { filename, content, contentType } = data.files[0];

    const params = {
      Bucket: "lost-and-found-app-bucket",
      Key: data.uid + "--" + filename,
      Body: content,
      ContentType: contentType,
      ACL: "public-read",
    };

    const { Location } = await s3.upload(params).promise();

    await cognitoidentityserviceprovider
      .adminUpdateUserAttributes({
        UserAttributes: [{
          Name: 'picture',
          Value: Location
        }],
        UserPoolId: process.env.USER_POOL_ID,
        Username: data.username
      })
      .promise();

    return {
      "statusCode": 201,
      "body": JSON.stringify({
        imageUrl: Location
      })
    }
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
