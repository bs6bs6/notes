import { APIGatewayProxyResult, APIGatewayProxyEvent, Context } from "aws-lambda"
import {DynamoDBClient} from '@aws-sdk/client-dynamodb'
import { postNotes } from "./PostNotes";
import { getNotes } from "./GetNotes";
import { updateNotes } from "./UpdateNotes";
import { deleteNotes } from "./DeleteNotes";
import { JSONError, MissingFieldError } from "../shared/Validators";

const ddbClient = new DynamoDBClient({});
 
async function handler(event: APIGatewayProxyEvent, context:Context): Promise<APIGatewayProxyResult>{

    let message: string;
    try{
        switch(event.httpMethod){
            case 'GET':
                const getResponse = await getNotes(event, ddbClient);
                console.log(getResponse);
                return getResponse;
            case 'POST':
                const postResponse = await postNotes(event, ddbClient);
                return postResponse;
            case 'PUT':
                const putResponse = await updateNotes(event, ddbClient);
                console.log(putResponse);
                return putResponse;
            case 'DELETE':
                const deleteResponse = await deleteNotes(event, ddbClient);
                console.log(deleteResponse);
                return deleteResponse;
            default:
                break;
        }
    
    }catch(error){
        if (error instanceof MissingFieldError) {
            return {
                statusCode: 400,
                body: JSON.stringify(error.message)
            }
        }
        if (error instanceof JSONError) {
            return {
                statusCode: 400,
                body: JSON.stringify(error.message)
            }
        }
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