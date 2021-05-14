const AWS = require('aws-sdk')
const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' })

exports.handler = async(e) => {

    try {
        const { uid } = e.queryStringParameters;

        const user = await cognito.adminGetUser({
            UserPoolId: process.env.USER_POOL_ID,
            Username: uid,
        }).promise()

        const result = user.UserAttributes.reduce((obj, eachObj) => {
            obj[eachObj.Name] = eachObj.Value;
            return obj;
        }, {});

        return {
            "statusCode": 200,
            "body": JSON.stringify(result)
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
