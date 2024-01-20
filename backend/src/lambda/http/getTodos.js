import 'source-map-support/register'
import { getTodosForUser } from '../../businessLogic/todos'
import { getToken } from '../auth/auth0Authorizer'

export async function handler(event) {
  console.log('Processing event: ' + event);
    const jwtToken = getToken(event.headers.Authorization);
    const todos = await getTodosForUser(jwtToken);
    return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      items: todos
    })
  }
}