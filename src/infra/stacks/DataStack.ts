import { Stack,StackProps } from 'aws-cdk-lib'
import { AttributeType, Table,ITable } from 'aws-cdk-lib/aws-dynamodb'
import {Construct} from 'constructs'
import { getSuffixFromStack } from '../Utils';


export class DataStack extends Stack {

    public readonly notesTable: ITable

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const suffix = getSuffixFromStack(this);

        this.notesTable = new Table(this, 'NotesTable',{
            partitionKey: {
                name: 'userid',
                type: AttributeType.STRING
            },
            sortKey:{
                name: 'noteid',
                type: AttributeType.STRING
            },
            tableName: `NoteTable-${suffix}`
        })


    }
}