import json
import boto3
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    
    roomId= event["queryStringParameters"]['roomId']
    
    rooms_table = dynamodb.Table("rooms")
    rooms_table.update_item(
        Key={
           'roomId': roomId
        },
        UpdateExpression="SET #seen=:i",
        ExpressionAttributeValues={
            ':i': True,
        },
        ExpressionAttributeNames={
            "#seen": "seen",
        },
        ReturnValues="UPDATED_NEW"
    )
    return {'statusCode': 200}
