import { Stack,StackProps } from 'aws-cdk-lib'
import {Construct} from 'constructs'
import {Code, Runtime} from 'aws-cdk-lib/aws-lambda'
import {join} from 'path'
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway'
import { ITable } from 'aws-cdk-lib/aws-dynamodb'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam'


interface LambdaStackProps extends StackProps {
    notesTable:ITable
}

export class LambdaStack extends Stack { 
    public readonly notesLambdaIntegeration: LambdaIntegration
    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props)

        const notesLambda = new NodejsFunction(this, 'NotesLabmda',{
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            entry:  (join(__dirname, '..', '..','services','notes','handler.ts')),
            environment:{
                TABLE_NAME: props.notesTable.tableName
            }
        });
        
        notesLambda.addToRolePolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['dynamodb:PutItem'],
            resources: [props.notesTable.tableArn]
        }))

        this.notesLambdaIntegeration = new LambdaIntegration(notesLambda)
    }
}