import json
import boto3
import datetime
import os
from boto3.dynamodb.conditions import Key, Attr

# connection URL (i.e. backend URL)
URL = os.environ['WEB_SOCKET_URL']
gatewayapi = boto3.client("apigatewaymanagementapi",
        endpoint_url = URL)
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    
    body = json.loads(event["body"])

    if 'payload' in body:
        
        payload = body["payload"]
        
        messageId = payload["messageId"]
        roomId = payload["roomId"]
        fromUid = payload["fromUid"]
        toUid = payload["toUid"]
        message = payload["message"]
        
        on = datetime.datetime.now().isoformat()
        
        rooms_table = dynamodb.Table("rooms")
        rooms_table.update_item(
            Key={
                'roomId': roomId
            },
            UpdateExpression="SET #messages = list_append(messages, :i), #seen=:j, #last=:k",
            ExpressionAttributeValues={
                ':i': [{"message" : message, "fromUid": fromUid, "toUid": toUid, "messageId": messageId, "on": on}],
                ':j': False,
                ':k': {"message" : message, "fromUid": fromUid, "toUid": toUid, "messageId": messageId, "on": on}
            },
            ExpressionAttributeNames={
                "#messages": "messages",
                "#seen": "seen",
                "#last": "last"
            },
            ReturnValues="UPDATED_NEW"
        )
        
    
        web_socket_table = dynamodb.Table('webSocket')
        response = web_socket_table.scan(
            FilterExpression=Attr('uid').eq(toUid)
        )
        for connection in response['Items']:
            post_message(connection["connectionId"], {"message" : message, "fromUid": fromUid, "toUid": toUid, "messageId": messageId, "on": on})
            

        return {'statusCode': 200}
    else:
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Message does not exist!'})
        }

def post_message(connectionId, payload):
    gateway_resp = gatewayapi.post_to_connection(ConnectionId=connectionId,
                                                 Data=json.dumps(payload))