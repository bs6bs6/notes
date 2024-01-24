import { fetchAuthSession } from '@aws-amplify/auth';
import { AuthService } from './AuthService';
import { S3Client,ListBucketsCommand } from '@aws-sdk/client-s3';
 
async function testAuth() {
    const service = new AuthService();
    await service.login('testUser', 'ygwhGSQ20000927!');
    
    const { idToken } = (await fetchAuthSession()).tokens ?? {};
    
    // console.log(idToken?.toString());
    const { credentials } = await fetchAuthSession();
    const buckets = await listBuckets(credentials);
}

async function listBuckets(credentials: any){
    const client = new S3Client({
        credentials:credentials
    });
    const command = new ListBucketsCommand({});
    const result = await client.send(command);

    return result;

}

testAuth();