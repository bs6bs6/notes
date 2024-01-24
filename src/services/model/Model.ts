
export interface NoteEntry{
    noteid: string,
    userid: string,
    content: string,
    attachment: string,
    created_at: number
}

export interface User {
    userName: string,

    isAdmin: boolean
}
