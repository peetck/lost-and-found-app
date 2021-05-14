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
    dynamodb = boto3.client("dynamodb")
    
    body = json.loads(event['body'])
    
    try:
        response = client.sign_up(
        ClientId=os.environ['clientId'],
        SecretHash=get_secret_hash(body['email']),
        Username=body['email'],
        Password=body['password'],
        UserAttributes=[
                {
                    'Name': 'nickname',
                    'Value': body['nickname']
                },
                {
                    'Name': 'email',
                    'Value': body['email']
                },
                {
                    'Name': 'picture',
                    'Value': body['picture']
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
        
        # create chat item for this user
        dynamodb.put_item(TableName="chats", Item={"uid": {"S": response["UserSub"]}, "rooms": {"L": []}})
        
        return returnResponse(200, 'Account creation was successful.', response)
        
    except client.exceptions.UsernameExistsException as e:
        return returnResponse(422, 'Sorry! An account with the given email / username already exists.')
        
    except client.exceptions.InvalidPasswordException as e:
        return returnResponse(422, 'Password did not conform with policy')
        
    except Exception as e:
        return returnResponse(500, "Whoops! Something went wrong. Please try again later")