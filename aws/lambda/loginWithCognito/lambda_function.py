import json
import boto3
import botocore.exceptions
import os
import hmac
import hashlib
import base64

def get_secret_hash(username):
    msg = username + os.environ['clientId']
    dig = hmac.new(str(os.environ['clientSecret']).encode('utf-8'),
        msg = str(msg).encode('utf-8'), digestmod=hashlib.sha256).digest()
    d2 = base64.b64encode(dig).decode()
    return d2

def returnResponse(code, message, data = None):
    return {
            'statusCode': code,
            'body': {
                'message': message,
                'data': data
            }
        }

def lambda_handler(event, context):

    client = boto3.client('cognito-idp')

    try:
        response = client.initiate_auth(
            AuthFlow='USER_PASSWORD_AUTH',
            AuthParameters={
                'USERNAME': event['email'],
                'PASSWORD': event['password'],
                'SECRET_HASH': get_secret_hash(event['email']),
            },
            ClientMetadata={
                'username': event['email'],
                'password': event['password']
            },
            ClientId=os.environ['clientId']
        )

        print(response)

        return returnResponse(200, 'Login was successful.', response)

    except client.exceptions.NotAuthorizedException as e:
        print(str(e))
        return returnResponse(422, 'Sorry! The credentials does not match.')

    except Exception as e:
        print(str(e))
        return returnResponse(500, "Whoops! Something went wrong. Please try again later")