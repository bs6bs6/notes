import { CfnOutput, Stack,StackProps } from 'aws-cdk-lib'
import { UserPool, UserPoolClient,CfnUserPoolGroup } from 'aws-cdk-lib/aws-cognito';

import {Construct} from 'constructs'

export class AuthStack extends Stack {

    public userPool:UserPool;
    private userPoolClient:UserPoolClient;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.createUserPool();
        this.createUserPoolClient();
        this.createAdminsGroup();

    }

    private createUserPool(){
        this.userPool = new UserPool(this, 'NoteUserPool',{
            selfSignUpEnabled: true,
            signInAliases: {
                username: true,
                email: true
            }
        });
        new CfnOutput(this, 'NoteUserPoolId', {
            value: this.userPool.userPoolId
        })
    }
    private createUserPoolClient(){
        this.userPoolClient = this.userPool.addClient('NoteUserPoolClient',{
            authFlows:{
                adminUserPassword: true,
                custom:true, 
                userPassword: true,
                userSrp:true
            }
        });
        new CfnOutput(this, 'NoteUserPoolClientId', {
            value: this.userPoolClient.userPoolClientId
        })
    }

    private createAdminsGroup(){
        new CfnUserPoolGroup(this,'NoteAdmins',{
            userPoolId: this.userPool.userPoolId,
            groupName: 'admins',
        })
    }
}