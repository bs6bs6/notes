import { APIGatewayProxyResult, APIGatewayProxyEvent, Context } from "aws-lambda"
import {DynamoDBClient} from '@aws-sdk/client-dynamodb'
import { postNotes } from "./PostNotes";
import { getNotes } from "./GetNotes";
import { updateNotes } from "./UpdateNotes";
import { deleteNotes } from "./DeleteNotes";
import { JSONError, MissingFieldError } from "../shared/Validators";
import { addCorsHeader } from "../shared/Util";

const ddbClient = new DynamoDBClient({});
 
async function handler(event: APIGatewayProxyEvent, context:Context): Promise<APIGatewayProxyResult>{
    let response: APIGatewayProxyResult;
    let message: string;
    try{
        switch(event.httpMethod){
            case 'GET':
                const getResponse = await getNotes(event, ddbClient);
                response = getResponse;
                break;
            case 'POST':
                const postResponse = await postNotes(event, ddbClient);
                response = postResponse;
                break;
            case 'PUT':
                const putResponse = await updateNotes(event, ddbClient);
                response = putResponse;
                break;
            case 'DELETE':
                const deleteResponse = await deleteNotes(event, ddbClient);
                response = deleteResponse;
                break;
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
    
    addCorsHeader(response);
    return response;
}

export{ handler}