import { APIGatewayProxyResult, APIGatewayProxyEvent, Context } from "aws-lambda"
import {DynamoDBClient} from '@aws-sdk/client-dynamodb'
import { postNotes } from "./PostNotes";
import { getNotes } from "./GetNotes";

const ddbClient = new DynamoDBClient({});
 
async function handler(event: APIGatewayProxyEvent, context:Context): Promise<APIGatewayProxyResult>{

    let message: string;
    try{
        switch(event.httpMethod){
            case 'GET':
                const getResponse = await getNotes(event, ddbClient);
                return getResponse;
            case 'POST':
                const postResponse = await postNotes(event, ddbClient);
                return postResponse;
            default:
                break;
        }
    
    }catch(error){
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        }
    }
    
    const response: APIGatewayProxyResult = {
        statusCode:200,
        body: JSON.stringify(message)
    }
    console.log(event);
    return response;
}

export{ handler}