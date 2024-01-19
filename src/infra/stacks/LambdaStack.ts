import { Stack,StackProps } from 'aws-cdk-lib'
import {Construct} from 'constructs'
import {Code, Runtime} from 'aws-cdk-lib/aws-lambda'
import {join} from 'path'
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway'
import { ITable } from 'aws-cdk-lib/aws-dynamodb'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'


interface LambdaStackProps extends StackProps {
    notesTable:ITable
}

export class LambdaStack extends Stack { 
    public readonly helloLambdaIntegeration: LambdaIntegration
    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props)

        const helloLambda = new NodejsFunction(this, 'HelloLabmda',{
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            entry:  (join(__dirname, '..', '..','services','hello.ts')),
            environment:{
                TABLE_NAME: props.notesTable.tableName
            }
        })

        this.helloLambdaIntegeration = new LambdaIntegration(helloLambda)
    }
}