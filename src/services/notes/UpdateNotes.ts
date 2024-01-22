import { DynamoDBClient,UpdateItemCommand} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent,APIGatewayProxyResult } from "aws-lambda";

export async function updateNotes(event: APIGatewayProxyEvent, ddbClient:DynamoDBClient): Promise<APIGatewayProxyResult>{
    
    if(event.queryStringParameters && ('id' in event.queryStringParameters) && event.body){
        
        const parsedBody = JSON.parse(event.body);
        const noteId = event.queryStringParameters['id'];
        const requestBodyKey = Object.keys(parsedBody)[0];
        const requestBodyValue = parsedBody[requestBodyKey];

        const updateResult = await ddbClient.send(new UpdateItemCommand({
            TableName: process.env.TABLE_NAME,
            Key:{
                'noteid':{
                    S: noteId
                }
            },
            UpdateExpression: 'set #zzzNew = :new',
            ExpressionAttributeValues: {
                ':new' : {
                    S: requestBodyValue
                }
            },
            ExpressionAttributeNames: {
                '#zzzNew': requestBodyKey
            },
            ReturnValues: 'UPDATED_NEW'
        }));
        return {
            statusCode: 204,
            body: JSON.stringify(unmarshall(updateResult.Attributes))
        }

    }else{
        return{
            statusCode: 204,
            body: JSON.stringify('Please provide tight args!')
        }
    }


}