import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";
import { AuthStack } from "./stacks/AuthStack";
import { UIDelpoymentStack } from "./stacks/UIDeploymentStack";


const app = new App();
const dataStack = new DataStack(app, 'DataStack');
const lambdaStack = new LambdaStack(app, 'LambdaStack',{
    notesTable: dataStack.notesTable
});
const authStack = new AuthStack(app, 'AuthStack')

new ApiStack(app, 'ApiStack', {
    notesLambdaIntegration: lambdaStack.notesLambdaIntegeration,
    userPool: authStack.userPool
})

new UIDelpoymentStack(app, 'UIDelpoymentStack')