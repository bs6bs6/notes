import { Stack,StackProps } from 'aws-cdk-lib'
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway'
import {Construct} from 'constructs'

interface ApiStackProps extends StackProps {
    notesLambdaIntegration: LambdaIntegration
}

export class ApiStack extends Stack {
    constructor(scope: Construct, id: string, props?: ApiStackProps) {
        super(scope, id, props)

        const api = new RestApi(this, 'NotesApi');
        const notesResource = api.root.addResource('notes');
        notesResource.addMethod('GET',props.notesLambdaIntegration);
        notesResource.addMethod('POST',props.notesLambdaIntegration);


    }
}