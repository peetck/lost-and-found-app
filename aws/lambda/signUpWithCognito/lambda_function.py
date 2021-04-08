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
        response = client.sign_up(
        ClientId=os.environ['clientId'],
        SecretHash=get_secret_hash(event['email']),
        Username=event['email'],
        Password=event['password'],
        UserAttributes=[
                {
                    'Name': 'nickname',
                    'Value': event['nickname']
                },
                {
                    'Name': 'email',
                    'Value': event['email']
                },
                {
                    'Name': 'picture',
                    'Value': event['picture']
                },
            ],
            ValidationData=[
                {
                    'Name': 'nickname',
                    'Value': 'string'
                },
                {
                    'Name': 'email',
                    'Value': 'string'
                },
                {
                    'Name': 'picture',
                    'Value': 'string'
                },
            ]
        )

        print(response)

        return returnResponse(200, 'Account creation was successful.', response)

    except client.exceptions.UsernameExistsException as e:
        return returnResponse(422, 'Sorry! An account with the given email / username already exists.')

    except client.exceptions.InvalidPasswordException as e:
        return returnResponse(422, 'Password did not conform with policy')

    except Exception as e:
        print(str(e))
        return returnResponse(500, "Whoops! Something went wrong. Please try again later")