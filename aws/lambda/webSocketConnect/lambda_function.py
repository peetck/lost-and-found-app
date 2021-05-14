import json
import boto3

TABLE_NAME = "webSocket";

def lambda_handler(event, context):
    
    uid = event.get("queryStringParameters").get("uid")
    
    client = boto3.client("dynamodb")
    
    client.put_item(TableName=TABLE_NAME, Item={"connectionId": {"S": event["requestContext"].get("connectionId")}, "uid": {"S": uid}})
    
    return {
        'statusCode': 200,
        'body': json.dumps('Connected')
    }
