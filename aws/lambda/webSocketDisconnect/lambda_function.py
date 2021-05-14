import json
import boto3

TABLE_NAME = "webSocket";

def lambda_handler(event, context):
    
    client = boto3.client("dynamodb")
    
    client.delete_item(TableName=TABLE_NAME, Key={"connectionId": {"S": event["requestContext"].get("connectionId")}})
    
    return {
        'statusCode': 200,
        'body': json.dumps('Disconnected')
    }
