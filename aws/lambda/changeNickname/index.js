const AWS = require('aws-sdk');
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

exports.handler = async(e) => {

    try {
        const data = JSON.parse(e.body);
        const { username, newNickname } = data;

        await cognitoidentityserviceprovider
            .adminUpdateUserAttributes({
                UserAttributes: [{
                    Name: 'nickname',
                    Value: newNickname
                }],
                UserPoolId: process.env.USER_POOL_ID,
                Username: username
            })
            .promise();
        return {
            "statusCode": 200,
            "body": JSON.stringify({
                message: "Change nickname success"
            })
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



};
