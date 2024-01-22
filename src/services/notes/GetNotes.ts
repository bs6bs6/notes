import { DynamoDBClient,ScanCommand ,GetItemCommand} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent,APIGatewayProxyResult } from "aws-lambda";

export async function getNotes(event: APIGatewayProxyEvent, ddbClient:DynamoDBClient): Promise<APIGatewayProxyResult>{
    
    if(event.queryStringParameters){
        if('id' in event.queryStringParameters){
            const noteId = event.queryStringParameters['id'];
            const getItemResponse = await ddbClient.send(new GetItemCommand({
                TableName: process.env.TABLE_NAME,
                Key:{
                    'noteid':{
                        S: noteId
                    }
                }
            }))
            if( getItemResponse.Item ){
                const unmashalledItem = unmarshall(getItemResponse.Item)

                return {
                    statusCode: 200,
                    body: JSON.stringify(unmashalledItem)
                }
            }else{
                return  {
                    statusCode: 404,
                    body: JSON.stringify(`Note with id ${noteId} not found!`)
                }
            }
        }else{
            return  {
                statusCode: 401,
                body: JSON.stringify('Id required!')
            }
        }
    }

    const result = await ddbClient.send(new ScanCommand({
        TableName: process.env.TABLE_NAME,
       
    }));
    console.log(result);
    return {
        statusCode: 201,
        body: JSON.stringify(result.Items)
    }


}