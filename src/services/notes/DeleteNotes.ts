import { DeleteItemCommand, DynamoDBClient,UpdateItemCommand} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent,APIGatewayProxyResult } from "aws-lambda";
import { hasAdminGroup } from "../../infra/Utils";

export async function deleteNotes(event: APIGatewayProxyEvent, ddbClient:DynamoDBClient): Promise<APIGatewayProxyResult>{
    
    if(!hasAdminGroup(event)){
        return {
            statusCode: 401,
            body: JSON.stringify('You are not authorized to perform this action!')
        }
    }

    if(event.queryStringParameters && ('id' in event.queryStringParameters)){

        const noteId = event.queryStringParameters['id'];

        const deleteResult = await ddbClient.send(new DeleteItemCommand({
            TableName: process.env.TABLE_NAME,
            Key:{
                'id':{
                    S: noteId
                }
            },
           
        }));
        return {
            statusCode: 200,
            body: JSON.stringify(`Delete note with id ${noteId} success!`)
        }

    }else{
        return{
            statusCode: 204,
            body: JSON.stringify('Please provide tight args!')
        }
    }


}