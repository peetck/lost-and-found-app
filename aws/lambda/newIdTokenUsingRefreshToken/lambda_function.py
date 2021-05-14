import json
import boto3
import botocore.exceptions
import os
import hmac
import hashlib
import base64

def get_secret_hash(uid):
    msg = uid + os.environ['clientId']
    dig = hmac.new(str(os.environ['clientSecret']).encode('utf-8'),
        msg = str(msg).encode('utf-8'), digestmod=hashlib.sha256).digest()
    d2 = base64.b64encode(dig).decode()
    return d2

def returnResponse(code, message, data = None):
    return {
            'statusCode': code,
            'body': json.dumps({
                'message': message,
                'data': data
            })
        }

def lambda_handler(event, context):

    client = boto3.client('cognito-idp')
    
    body = json.loads(event['body'])

    try:
        response = client.initiate_auth(
            AuthFlow='REFRESH_TOKEN_AUTH',
            AuthParameters={
                'REFRESH_TOKEN': body['refresh_token'],
                'SECRET_HASH': get_secret_hash(body['uid'])
            },
            ClientId=os.environ['clientId']
        )

        return returnResponse(200, 'Token Refreshed successfully.', response)

    except client.exceptions.NotAuthorizedException as e:
        return returnResponse(422, 'Sorry! The refresh token credetials does not match.')

    except Exception as e:
        return returnResponse(500, "Whoops! Something went wrong. Please try again later")