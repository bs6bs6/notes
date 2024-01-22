import { Amplify } from "aws-amplify"
import { signIn,SignInOutput } from "@aws-amplify/auth"

Amplify.configure({
    Auth:{
        Cognito:{
            userPoolId: 'us-west-2_iPu42QNzy',
            userPoolClientId: '1mr69i4fdiispnfr4amaj06111',
        }
    }
})



export class AuthService{
    public async login(userName: string, password: string){
        const result = await signIn({
            username: userName,
            password: password,
            options:{
                authFlowType: 'USER_PASSWORD_AUTH',
            }
        }) as SignInOutput;

        return result;
    }
}
