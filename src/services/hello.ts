import { APIGatewayProxyResult, APIGatewayProxyEvent, Context } from "aws-lambda"
import {v4} from 'uuid'
// exports.main = async (event, context) => {
//     return {
//         statusCode: 200,
//         body: JSON.stringify(`Hello I will read from ${process.env.TABLE_NAME}!`)
//     }
// }

async function handler(event: APIGatewayProxyEvent, context:Context){

    const response: APIGatewayProxyResult = {
        statusCode:200,
        body: JSON.stringify("Hello from lambda!, this the id:'"+v4())
    }
    console.log(event);
    return response;
}

export{ handler}