import { Stack,StackProps } from 'aws-cdk-lib'
import { AuthorizationType, CognitoUserPoolsAuthorizer, LambdaIntegration, MethodOptions, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { IUserPool } from 'aws-cdk-lib/aws-cognito'
import {Construct} from 'constructs'

interface ApiStackProps extends StackProps {
    notesLambdaIntegration: LambdaIntegration,
    userPool: IUserPool;
}

export class ApiStack extends Stack {
    constructor(scope: Construct, id: string, props?: ApiStackProps) {
        super(scope, id, props)

        const api = new RestApi(this, 'NotesApi');

        const authorizer = new CognitoUserPoolsAuthorizer(this,'NotesApiAuthorizer',{
            cognitoUserPools:[props.userPool],
            identitySource: 'method.request.header.Authorization'
        })

        authorizer._attachToApi(api)

        const optionsWithAuth: MethodOptions = {
            authorizationType: AuthorizationType.COGNITO,
            authorizer: {
                authorizerId: authorizer.authorizerId,
            }
        }

        const notesResource = api.root.addResource('notes');
        notesResource.addMethod('GET',props.notesLambdaIntegration,optionsWithAuth);
        notesResource.addMethod('POST',props.notesLambdaIntegration,optionsWithAuth);
        notesResource.addMethod('PUT',props.notesLambdaIntegration,optionsWithAuth);
        notesResource.addMethod('DELETE',props.notesLambdaIntegration,optionsWithAuth);



    }
}