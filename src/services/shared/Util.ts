import { v4 } from "uuid";
import { JSONError } from "./Validators";
import { APIGatewayProxyResult } from "aws-lambda";

export function addCorsHeader(arg: APIGatewayProxyResult){
    if(!arg.headers){
        arg.headers = {};
    }
    arg.headers['Access-Control-Allow-Origin'] = '*';
    arg.headers['Access-Control-Allow-Methods'] = '*';

}

export function parseJSON(arg:string){
    try{
        return JSON.parse(arg);

    }catch(error){
        throw new JSONError(error.message)
    }
}

export function createRandomId(){
    return v4();
}