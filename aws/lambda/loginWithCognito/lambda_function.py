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
            AuthFlow='USER_PASSWORD_AUTH',
            AuthParameters={
                'USERNAME': body['email'],
                'PASSWORD': body['password'],
                'SECRET_HASH': get_secret_hash(body['email']),
            },
            ClientMetadata={
                'username': body['email'],
                'password': body['password']
            },
            ClientId=os.environ['clientId']
        )

        
        return returnResponse(200, 'Login was successful.', response)
        
    except client.exceptions.NotAuthorizedException as e:
        return returnResponse(422, 'Sorry! The credentials does not match.')
        
    except Exception as e:
        return returnResponse(500, "Whoops! Something went wrong. Please try again later")