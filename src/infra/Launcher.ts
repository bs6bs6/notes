import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";



const app = new App();
const dataStack = new DataStack(app, 'DataStack');
const lambdaStack = new LambdaStack(app, 'LambdaStack',{
    notesTable: dataStack.notesTable
});
new ApiStack(app, 'ApiStack', {
    notesLambdaIntegration: lambdaStack.notesLambdaIntegeration
})
