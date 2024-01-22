import { DynamoDBClient,PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent,APIGatewayProxyResult } from "aws-lambda";
import { marshall } from "@aws-sdk/util-dynamodb";
import { validateAsNoteEntry } from "../shared/Validators";
import { createRandomId, parseJSON } from "../shared/Util";

export async function postNotes(event: APIGatewayProxyEvent, ddbClient:DynamoDBClient): Promise<APIGatewayProxyResult>{
    
    const randomId = createRandomId();
    const item = parseJSON(event.body);
    item.noteid = randomId;

    validateAsNoteEntry(item);

    console.log(process.env.TABLE_NAME);
    const result = await ddbClient.send(new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: marshall(item)
    }));
    console.log(result);
    return {
        statusCode: 201,
        body: JSON.stringify({noteId: randomId})
    }


}