import { handler } from "../src/services/notes/handler";


handler({
    httpMethod: 'POST',
    queryStringParameters: {
        id: '1c1840cc-336b-402a-874e-5e97cf4879c6'
    },
    body: JSON.stringify({
        // userid: '123',
        content: 'test content',
        attachment: 'test attachment',
        created_at: Date.now()
    })

} as any,{} as any).then((result) => {console.log(result);});