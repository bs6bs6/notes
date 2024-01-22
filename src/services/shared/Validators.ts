import { NoteEntry } from "../model/Model"


export class MissingFieldError extends Error{
    constructor(missingField: string) {
        super(`Value for ${missingField} expected`)
    }
}

export class JSONError extends Error{
    constructor(message:string){
        super(message)
    }
}

export function validateAsNoteEntry(arg:any){
    if((arg as NoteEntry).noteid === undefined){
        throw new MissingFieldError('noteId')
    }

    if((arg as NoteEntry).userid === undefined){
        throw new MissingFieldError('userId')
    }
}