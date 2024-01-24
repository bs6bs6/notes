import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { getSuffixFromStack } from '../Utils';
import { join } from 'path';
import { existsSync } from 'fs';
import { BucketDeployment ,Source} from 'aws-cdk-lib/aws-s3-deployment';
import { Distribution, OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';


export class UIDelpoymentStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const suffix = getSuffixFromStack(this);

        const deploymentBucket = new Bucket(this, 'uiDeploymentBucket',{
            bucketName: `notes-frontend-${suffix}`
        });

        const uiDir = join(__dirname, '..', '..', '..','..', 'notes-frontend', 'dist');
        if(!existsSync(uiDir)){
            console.warn('UI directory not found '+ uiDir);
            return ;
        }

        new BucketDeployment(this,'NotesDeployment',{
            sources: [Source.asset(uiDir)],
            destinationBucket: deploymentBucket
        });
        
        const originIndentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');
        deploymentBucket.grantRead(originIndentity);

        const distribution = new Distribution(this, 'Distribution',{
            defaultRootObject: 'index.html',
            defaultBehavior:{
                origin: new S3Origin(deploymentBucket, {
                    originAccessIdentity: originIndentity
                })
            }
        });

        new CfnOutput(this,'NotesUrl',{
            value: distribution.distributionDomainName
        })
    }

}